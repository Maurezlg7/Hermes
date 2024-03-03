from flask import Blueprint, render_template

usuarios_bp = Blueprint('usuarios', __name__)
paginas_bp = Blueprint('paginas', __name__)

@paginas_bp.route('/')
def index():
    return render_template('index.html')
