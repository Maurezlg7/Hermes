from flask import Blueprint, json, render_template, request
from .models import User_Controller, servers_controller, ChannelsController, ChatController

users_bp = Blueprint('users', __name__)
pages_bp = Blueprint('pages', __name__)
app_bp = Blueprint('app', __name__)

@pages_bp.route('/')
def index():
    return render_template('index.html')

@pages_bp.route('/user')
def user_page():
    return render_template('user.html')

@users_bp.route('/register', methods=['POST'])
def create_user():
    data = request.json
    return User_Controller().create_user(data)

@users_bp.route('/login', methods=['POST'])
def login_user():
    data = request.json
    return User_Controller().user_login(data)

@app_bp.route('/app')
def app_page():
    with open("C:/Users/Mauro/Documents/CODE/Proyectos/Hermes/app/static/json/user.json","r") as file:
        name_user = json.load(file)
    name = str(name_user["Name"])
    return render_template('app.html', name=name)

@app_bp.route('/server_add', methods=['POST'])
def server_add():
    data = request.json
    return servers_controller().create_server(data)

@app_bp.route('/view_servers', methods=['GET'])
def view_servers_all():
    return servers_controller().calling_servers()

@app_bp.route('/channel_add', methods=['POST'])
def channel_add():
    data = request.json
    return ChannelsController().create_channels(data)

@app_bp.route('/channel_id', methods=['POST'])
def channel_id():
    data = request.json
    return ChannelsController().saveid_channel(data)

@app_bp.route('/view_channels', methods=['GET'])
def view_channels_all():
    return ChannelsController().calling_channels()

@app_bp.route('/chat_id', methods=['POST'])
def chat_id():
    data = request.json
    return ChatController().save_id_chat(data)

@app_bp.route('/chat_add', methods=['POST'])
def chat_add():
    data = request.json
    return ChatController().create_chat(data)

@app_bp.route('/view_chats', methods=['GET'])
def view_chats_all():
    return ChatController().calling_chats()

@app_bp.route('/get_id_user', methods=['GET'])
def get_id_user():
    return ChatController().get_id_user()