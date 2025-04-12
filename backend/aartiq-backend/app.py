from functools import wraps

from flask import Flask, render_template
from flask_cors import CORS
from itsdangerous import URLSafeTimedSerializer
from models.database import db, init_db

# Create Flask app
app = Flask(__name__)

# Configure app
SECRET_KEY = 'SUPER_SECRET_KEY'
app.secret_key = SECRET_KEY
app.config['SECRET_KEY'] = SECRET_KEY
CORS(app, resources={r"/*": {"origins": "*"}})
s = URLSafeTimedSerializer(SECRET_KEY)

# Initialize SQLAlchemy
init_db(app)

# Import blueprints after SQLAlchemy initialization
from apis import create_app

@app.route('/')
@app.route('/home')
def index():
	return render_template('index.html')

# Register blueprints with the app
app = create_app(app)

if __name__ == '__main__':
	app.run(debug=True)  # Set to True for development
