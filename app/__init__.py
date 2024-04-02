from flask import Flask
from .routes import users_bp, pages_bp, app_bp

def create_app():
    app = Flask(__name__)

    app.register_blueprint(users_bp)
    app.register_blueprint(pages_bp)
    app.register_blueprint(app_bp)

    return app
