from flask import Flask
from .routes import usuarios_bp, paginas_bp

def create_app():
    app = Flask(__name__)

    app.register_blueprint(usuarios_bp)
    app.register_blueprint(paginas_bp)

    return app
