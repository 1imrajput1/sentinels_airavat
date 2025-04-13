from flask import Blueprint, current_app, request, jsonify, send_file
import os
from google import genai
import pandas as pd
import tempfile
import io
from fpdf import FPDF
from utils import token_required, get_db_connection
import datetime
import csv
import json


# Define the blueprint for Gemini API
gemini_api = Blueprint('gemini_api', __name__)


# Helper to initialize the Gemini client
def get_gemini_client():
    api_key = current_app.config.get('GEMINI_API_KEY', None)
    if not api_key:
        raise ValueError("GEMINI_API_KEY not configured")
    return genai.Client(api_key=api_key)


# Simple Q&A route
@gemini_api.route('/ask', methods=['POST'])
#@token_required
def ask_question():
    user_id = 1
    question = request.json.get('question')

    if not question:
        return jsonify({"success": False, "message": "Question is required"}), 400

    try:
        client = get_gemini_client()
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[question]
        )

        return jsonify({
            "success": True,
            "answer": response.text
        }), 200

    except Exception as e:
        return jsonify({"success": False, "message": f"Failed to get response: {str(e)}"}), 500


# Create new chat session
@gemini_api.route('/chat/create', methods=['POST'])
#@token_required  # You should add this back if it was intentionally removed
def create_chat():
    user_id = 1

    try:
        client = get_gemini_client()
        chat = client.chats.create(model="gemini-2.0-flash")

        # Generate a unique chat ID since the Gemini chat object doesn't have one
        # You can use UUID or timestamp-based ID
        import uuid
        chat_id = str(uuid.uuid4())

        # Store chat session ID in database for later retrieval
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO ChatSessions (chat_id, user_id, title)
            VALUES (?, ?, ?)
        ''', (chat_id, user_id, f"Chat {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}"))
        conn.commit()
        conn.close()

        # Store the chat object in your application's cache or session
        # This is a simplified example - you'll need to implement proper storage
        if 'chat_sessions' not in current_app.config:
            current_app.config['chat_sessions'] = {}
        current_app.config['chat_sessions'][chat_id] = chat

        return jsonify({
            "success": True,
            "chat_id": chat_id,
            "message": "Chat session created"
        }), 201

    except Exception as e:
        return jsonify({"success": False, "message": f"Failed to create chat: {str(e)}"}), 500

# Send message to existing chat
@gemini_api.route('/chat/message', methods=['POST'])
#@token_required
def send_message():
    user_id = 1
    chat_id = request.json.get('chat_id')
    message = request.json.get('message')

    if not chat_id or not message:
        return jsonify({"success": False, "message": "Chat ID and message are required"}), 400

    try:
        # Retrieve chat session from the application's storage
        if 'chat_sessions' not in current_app.config or chat_id not in current_app.config['chat_sessions']:
            return jsonify({"success": False, "message": "Chat session not found"}), 404

        chat = current_app.config['chat_sessions'][chat_id]

        # Send message and collect response
        response = chat.send_message(message)

        # Store message in database
        conn = get_db_connection()
        cursor = conn.cursor()

        # Store user message
        cursor.execute('''
            INSERT INTO ChatMessages (chat_id, role, content)
            VALUES (?, ?, ?)
        ''', (chat_id, 'user', message))

        # Store AI response
        cursor.execute('''
            INSERT INTO ChatMessages (chat_id, role, content)
            VALUES (?, ?, ?)
        ''', (chat_id, 'model', response.text))

        conn.commit()
        conn.close()

        return jsonify({
            "success": True,
            "response": response.text
        }), 200

    except Exception as e:
        return jsonify({"success": False, "message": f"Failed to send message: {str(e)}"}), 500

# Get chat history
@gemini_api.route('/chat/history', methods=['GET'])
def get_chat_history():
    user_id = 1
    chat_id = request.args.get('chat_id')

    if not chat_id:
        return jsonify({"success": False, "message": "Chat ID is required"}), 400

    try:
        # Get chat history from database instead of relying on Gemini API
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('''
            SELECT role, content, timestamp
            FROM ChatMessages
            WHERE chat_id = ?
            ORDER BY timestamp ASC
        ''', (chat_id,))

        messages = cursor.fetchall()
        conn.close()

        history = []
        for message in messages:
            history.append({
                "role": message[0],
                "content": message[1],
                "timestamp": message[2]
            })

        return jsonify({
            "success": True,
            "history": history
        }), 200

    except Exception as e:
        return jsonify({"success": False, "message": f"Failed to get chat history: {str(e)}"}), 500

# Analyze transactions from CSV file
@gemini_api.route('/analyze-transactions', methods=['POST'])
def analyze_transactions():
    user_id = 1

    if 'file' not in request.files:
        return jsonify({"success": False, "message": "No file provided"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"success": False, "message": "No file selected"}), 400

    if not file.filename.endswith('.csv'):
        return jsonify({"success": False, "message": "Only CSV files are supported"}), 400

    try:
        # Save the file to a temporary location
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.csv')
        file.save(temp_file.name)
        temp_file.close()

        # Read the CSV
        df = pd.read_csv(temp_file.name)

        # Basic validation of the file structure
        required_columns = ['Account_No', 'DATE', 'TRANSACTION_DETAILS', 'CHQ.NO.', 'VALUE_DATE', 'AMOUNT', 'DEPOSIT_AMOUNT', 'BALANCE_AMOUNT']  # Adjust based on your expected CSV structure
        missing_columns = [col for col in required_columns if col.lower() not in [c.lower() for c in df.columns]]

        if missing_columns:
            os.unlink(temp_file.name)  # Delete the temp file
            return jsonify({
                "success": False,
                "message": f"CSV file is missing required columns: {', '.join(missing_columns)}"
            }), 400

        # Generate a summary of the transactions
        summary = {
            "total_transactions": len(df),
            "total_spend": df[df['amount'] < 0]['amount'].sum(),
            "total_income": df[df['amount'] > 0]['amount'].sum(),
            "date_range": f"{df['date'].min()} to {df['date'].max()}"
        }

        # Convert to CSV string to send to Gemini
        csv_content = df.to_csv(index=False)

        # Create a prompt for Gemini
        prompt = f"""
        Here are bank transactions for a user. Please analyze these transactions and provide:

        1. A summary of spending patterns
        2. Top spending categories
        3. Recommendations for saving money
        4. Unusual transactions or potential flags
        5. Monthly income and expense trends

        CSV Data:
        {csv_content}

        Please format your response so it can be easily converted to a PDF report.
        """

        client = get_gemini_client()
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[prompt]
        )

        # Generate PDF report
        pdf = FPDF()
        pdf.add_page()

        # Add title
        pdf.set_font("Arial", "B", 16)
        pdf.cell(0, 10, "Transaction Analysis Report", ln=True, align="C")
        pdf.ln(10)

        # Add date
        pdf.set_font("Arial", "", 10)
        pdf.cell(0, 10, f"Generated on: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", ln=True)
        pdf.cell(0, 10, f"Analysis for User ID: {user_id}", ln=True)
        pdf.ln(10)

        # Add summary
        pdf.set_font("Arial", "B", 12)
        pdf.cell(0, 10, "Transaction Summary", ln=True)
        pdf.set_font("Arial", "", 10)
        pdf.cell(0, 10, f"Total Transactions: {summary['total_transactions']}", ln=True)
        pdf.cell(0, 10, f"Total Spending: ${abs(summary['total_spend']):.2f}", ln=True)
        pdf.cell(0, 10, f"Total Income: ${summary['total_income']:.2f}", ln=True)
        pdf.cell(0, 10, f"Date Range: {summary['date_range']}", ln=True)
        pdf.ln(10)

        # Add Gemini analysis
        pdf.set_font("Arial", "B", 12)
        pdf.cell(0, 10, "Detailed Analysis", ln=True)
        pdf.set_font("Arial", "", 10)

        # Split the response text into lines and add to PDF
        text = response.text
        lines = text.split('\n')
        for line in lines:
            if line.strip():
                # Check if it's a header
                if line.startswith('#'):
                    pdf.set_font("Arial", "B", 12)
                    pdf.cell(0, 10, line.replace('#', '').strip(), ln=True)
                    pdf.set_font("Arial", "", 10)
                else:
                    # Wrap long lines
                    pdf.multi_cell(0, 5, line)

        # Generate the PDF in memory
        pdf_output = io.BytesIO()
        pdf.output(pdf_output)
        pdf_output.seek(0)

        # Clean up the temporary file
        os.unlink(temp_file.name)

        # Return the PDF file
        return send_file(
            pdf_output,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=f'transaction_analysis_{datetime.datetime.now().strftime("%Y%m%d")}.pdf'
        )

    except pd.errors.ParserError:
        return jsonify({"success": False, "message": "Invalid CSV file format"}), 400
    except Exception as e:
        if os.path.exists(temp_file.name):
            os.unlink(temp_file.name)
        return jsonify({"success": False, "message": f"Analysis failed: {str(e)}"}), 500


# Get financial advice based on user data
@gemini_api.route('/financial-advice', methods=['GET'])
#@token_required
def get_financial_advice():
    user_id = 1

    try:
        # Get user financial data from database
        conn = get_db_connection()
        cursor = conn.cursor()

        # Get user profile
        cursor.execute('''
            SELECT monthly_income, level, savings_score 
            FROM Users 
            WHERE user_id = ?
        ''', (user_id,))

        user_data = cursor.fetchone()

        if not user_data:
            return jsonify({"success": False, "message": "User not found"}), 404

        monthly_income = user_data[0]
        level = user_data[1]
        savings_score = user_data[2]

        # Get recent transactions (if you have a Transactions table)
        cursor.execute('''
            SELECT amount, category, date
            FROM Transactions
            WHERE user_id = ?
            ORDER BY date DESC
            LIMIT 20
        ''', (user_id,))

        transactions = cursor.fetchall()
        conn.close()

        # Format the data
        transaction_data = []
        for t in transactions:
            transaction_data.append({
                "amount": t[0],
                "category": t[1],
                "date": t[2]
            })

        # Create the prompt for Gemini
        prompt = f"""
        Please provide personalized financial advice for a user with the following information:

        Monthly Income: ${monthly_income}
        Financial Literacy Level: {level}/10
        Savings Score: {savings_score}/100

        Recent Transactions:
        {json.dumps(transaction_data)}

        Based on this information, provide:
        1. Short-term savings recommendations
        2. Long-term investment advice
        3. Budget optimization tips
        4. Areas where the user might be overspending
        5. Financial goals this user should consider

        Keep your advice specific to this user's financial situation.
        """

        client = get_gemini_client()
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[prompt]
        )

        return jsonify({
            "success": True,
            "advice": response.text
        }), 200

    except Exception as e:
        return jsonify({"success": False, "message": f"Failed to get advice: {str(e)}"}), 500