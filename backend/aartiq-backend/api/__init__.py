from flask import Blueprint, Flask, jsonify, make_response
from .users import user_management
from .group_management import group_management
# from .scores import scores_management
# from .quizes import quiz_management
# from .chapters import chapter_management
# from .subjects import subject_management
# from .questions import question_management
# from .attempts_manager import attempts_management
from flask_cors import CORS
from itsdangerous import URLSafeTimedSerializer


def create_app(app):
    """Register blueprints with the existing Flask app."""
    # Register the blueprints
    app.register_blueprint(user_management, url_prefix='/users')
    app.register_blueprint(group_management, url_prefix='/groups')
    # app.register_blueprint(quiz_management, url_prefix='/quiz')
    # app.register_blueprint(scores_management, url_prefix='/scores')
    # app.register_blueprint(chapter_management, url_prefix='/chapters')
    # app.register_blueprint(subject_management, url_prefix='/subjects')
    # app.register_blueprint(question_management, url_prefix='/questions')
    # app.register_blueprint(attempts_management, url_prefix='/attempts')

    return app

