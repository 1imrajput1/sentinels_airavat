from flask import Blueprint, current_app, request, jsonify
import jwt
import bcrypt
import datetime
from utils import get_db_connection, token_required

# Define the blueprint for users
user_management = Blueprint('user_management', __name__)


# Authenticate user
@user_management.route('/authenticate', methods=['POST'])
def authenticate():
    username = request.json.get("username")
    password = request.json.get("password")

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT user_id, username, password_hash, monthly_income, level FROM Users WHERE username = ?',
                   (username,))
    result = cursor.fetchone()
    conn.close()

    if result and bcrypt.checkpw(password.encode('utf-8'), result['password_hash'].encode('utf-8')):
        token = jwt.encode({
            'user_id': result['user_id'],
            'username': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=90)
        }, current_app.config['SECRET_KEY'])

        return jsonify({
            "success": True,
            "message": "Authentication successful",
            "token": token,
            "user_id": result['user_id'],
            "username": result['username'],
            "monthly_income": result['monthly_income'],
            "level": result['level']
        }), 200
    return jsonify({"success": False, "message": "Invalid credentials"}), 401


# Register user
@user_management.route('/register', methods=['POST'])
def register():
    username = request.json.get("username")
    password = request.json.get("password")
    email = request.json.get("email")
    monthly_income = request.json.get("monthly_income", 0)
    notify_low_balance_threshold = request.json.get("notify_low_balance_threshold", 100.00)

    if not username or not password or not email:
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    pass_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if username already exists
    cursor.execute('SELECT COUNT(*) FROM Users WHERE username = ?', (username,))
    if cursor.fetchone()[0] > 0:
        conn.close()
        return jsonify({"success": False, "message": "Username already exists"}), 409

    # Check if email already exists
    cursor.execute('SELECT COUNT(*) FROM Users WHERE email = ?', (email,))
    if cursor.fetchone()[0] > 0:
        conn.close()
        return jsonify({"success": False, "message": "Email already exists"}), 409

    try:
        cursor.execute('''
            INSERT INTO Users (
                username, 
                email, 
                password_hash, 
                monthly_income, 
                notify_low_balance_threshold,
                signup_date,
                last_login
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            username,
            email,
            pass_hash,
            monthly_income,
            notify_low_balance_threshold,
            datetime.datetime.utcnow(),
            datetime.datetime.utcnow()
        ))

        conn.commit()

        # Get the new user_id
        cursor.execute('SELECT user_id FROM Users WHERE username = ?', (username,))
        user_id = cursor.fetchone()[0]

        return jsonify({
            "success": True,
            "message": "User registered successfully",
            "user_id": user_id
        }), 201

    except Exception as e:
        conn.rollback()
        return jsonify({"success": False, "message": f"Registration failed: {str(e)}"}), 500
    finally:
        conn.close()


# Get user profile
@user_management.route('/profile', methods=['GET'])
@token_required
def get_profile():
    user_id = request.token_data['user_id']

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        SELECT 
            user_id, 
            username, 
            email, 
            monthly_income, 
            notify_low_balance_threshold,
            total_points,
            level,
            savings_score,
            streak_days,
            signup_date,
            last_login
        FROM Users WHERE user_id = ?
    ''', (user_id,))

    result = cursor.fetchone()
    conn.close()

    if not result:
        return jsonify({"success": False, "message": "User not found"}), 404

    return jsonify({
        "success": True,
        "user": {
            "user_id": result[0],
            "username": result[1],
            "email": result[2],
            "monthly_income": result[3],
            "notify_low_balance_threshold": result[4],
            "total_points": result[5],
            "level": result[6],
            "savings_score": result[7],
            "streak_days": result[8],
            "signup_date": result[9],
            "last_login": result[10]
        }
    }), 200


# Update user profile
@user_management.route('/profile', methods=['PUT'])
@token_required
def update_profile():
    user_id = request.token_data['user_id']
    data = request.json

    allowed_fields = {
        'email', 'monthly_income', 'notify_low_balance_threshold', 'password'
    }

    update_fields = {}

    for field in allowed_fields:
        if field in data:
            if field == 'password':
                update_fields['password_hash'] = bcrypt.hashpw(
                    data[field].encode('utf-8'),
                    bcrypt.gensalt()
                ).decode('utf-8')
            else:
                update_fields[field] = data[field]

    if not update_fields:
        return jsonify({"success": False, "message": "No valid fields to update"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    # If updating email, check if it already exists
    if 'email' in update_fields:
        cursor.execute('SELECT COUNT(*) FROM Users WHERE email = ? AND user_id != ?',
                       (update_fields['email'], user_id))
        if cursor.fetchone()[0] > 0:
            conn.close()
            return jsonify({"success": False, "message": "Email already exists"}), 409

    try:
        set_clause = ', '.join([f"{field} = ?" for field in update_fields.keys()])
        query = f"UPDATE Users SET {set_clause} WHERE user_id = ?"

        cursor.execute(query, list(update_fields.values()) + [user_id])
        conn.commit()

        return jsonify({"success": True, "message": "Profile updated successfully"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"success": False, "message": f"Update failed: {str(e)}"}), 500
    finally:
        conn.close()


# Update user gamification stats
@user_management.route('/update-stats', methods=['PUT'])
@token_required
def update_stats():
    user_id = request.token_data['user_id']
    data = request.json

    allowed_fields = {
        'total_points', 'level', 'savings_score', 'streak_days'
    }

    update_fields = {}

    for field in allowed_fields:
        if field in data:
            update_fields[field] = data[field]

    if not update_fields:
        return jsonify({"success": False, "message": "No valid fields to update"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        set_clause = ', '.join([f"{field} = ?" for field in update_fields.keys()])
        query = f"UPDATE Users SET {set_clause} WHERE user_id = ?"

        cursor.execute(query, list(update_fields.values()) + [user_id])
        conn.commit()

        return jsonify({"success": True, "message": "Stats updated successfully"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"success": False, "message": f"Update failed: {str(e)}"}), 500
    finally:
        conn.close()


# Record user login
@user_management.route('/record-login', methods=['POST'])
@token_required
def record_login():
    user_id = request.token_data['user_id']

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Update last login time
        cursor.execute('UPDATE Users SET last_login = ? WHERE user_id = ?',
                       (datetime.datetime.utcnow(), user_id))

        # Check if we need to update streak
        cursor.execute('SELECT last_login, streak_days FROM Users WHERE user_id = ?', (user_id,))
        result = cursor.fetchone()

        if result:
            last_login = datetime.datetime.fromisoformat(result[0]) if result[0] else None
            streak_days = result[1]

            now = datetime.datetime.utcnow()

            # If last login was yesterday (within 24-48 hours), increment streak
            if last_login and (now - last_login).days == 1:
                cursor.execute('UPDATE Users SET streak_days = streak_days + 1 WHERE user_id = ?',
                               (user_id,))
            # If more than 48 hours have passed, reset streak
            elif last_login and (now - last_login).days > 1:
                cursor.execute('UPDATE Users SET streak_days = 1 WHERE user_id = ?', (user_id,))
            # If first login or same day, keep streak as is

        conn.commit()
        return jsonify({"success": True, "message": "Login recorded successfully"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"success": False, "message": f"Failed to record login: {str(e)}"}), 500
    finally:
        conn.close()


# Delete user account
@user_management.route('/account', methods=['DELETE'])
@token_required
def delete_account():
    user_id = request.token_data['user_id']

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute('DELETE FROM Users WHERE user_id = ?', (user_id,))
        conn.commit()

        return jsonify({"success": True, "message": "Account deleted successfully"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"success": False, "message": f"Failed to delete account: {str(e)}"}), 500
    finally:
        conn.close()


# Get leaderboard
@user_management.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    limit = request.args.get('limit', 10, type=int)

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        SELECT 
            user_id, 
            username,
            total_points, 
            level, 
            savings_score, 
            streak_days
        FROM Users 
        ORDER BY total_points DESC, level DESC, savings_score DESC
        LIMIT ?
    ''', (limit,))

    results = cursor.fetchall()
    conn.close()

    leaderboard = [{
        "user_id": row[0],
        "username": row[1],
        "total_points": row[2],
        "level": row[3],
        "savings_score": row[4],
        "streak_days": row[5],
        "rank": idx + 1
    } for idx, row in enumerate(results)]

    return jsonify({
        "success": True,
        "leaderboard": leaderboard
    }), 200