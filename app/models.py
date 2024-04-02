from flask import request, jsonify, json
from .database import DatabaseConnection
class User_Controller():
    def __init__(self):
        self._id = None
        self._name = None
        self._phone = None
        self._email = None
        self._password = None
        self._creation = None

    def create_user(self, data):
        self._name = data.get('name')
        self._phone = data.get('phone')
        self._email = data.get('email')
        self._password = data.get('password')
        
        try:
            query_check = "SELECT * FROM user WHERE email = %s"
            values = (self._email,)
            result_check = DatabaseConnection.fetch_one(query_check, values)
            print(result_check)
            if result_check is None or result_check[3] != self._email:
                query = "INSERT INTO user (name, phone, email, password) VALUES (%s, %s, %s, %s)"
                values = (self._name, self._phone, self._email, self._password)
                DatabaseConnection.execute_query(query, values)
                self._reset_attributes()
                return jsonify("Usuario creado exitosamente")
            else:
                return jsonify("El usuario ya existe")
        
        except Exception as e:
            self._reset_attributes()
            return jsonify(f"No se pudo crear el usuario. ERROR: => {e}\nEste error se debe a que la logica no es correcta al querer hacerle al sql")

    def user_login(self, data):
        email = data.get('email')
        password = data.get('password')
        
        try:
            query = "SELECT * FROM user WHERE email = %s AND password = %s"
            values = (email, password)
            result_check = DatabaseConnection.fetch_one(query, values)
            if result_check is not None:
                user_character = [int(result_check[0]), result_check[1]]
                user_data = {'ID': result_check[0],'Name': result_check[1]}
                with open('C:/Users/Mauro/Documents/CODE/Proyectos/Hermes/app/static/json/user.json', 'w') as file:
                    json.dump(user_data,file, indent=4)
                return jsonify(user_character)
            else:
                return jsonify("Credenciales incorrectas")
        except Exception as e:
            return jsonify(f"Error: {e}")


    def _reset_attributes(self):
        self._name = None
        self._phone = None
        self._email = None
        self._password = None
        self._creation = None

class servers_controller:
    def __init__(self):
        self._name = None
        self._description = None
        self._image = None
        self._creator_user = None
    
    def create_server(self, data):
        name = data.get('name')
        description = data.get('description')

        if not name or not description:
            self._reset_atributtes()
            return jsonify("Faltan datos")

        try:
            with open ('C:/Users/Mauro/Documents/CODE/Proyectos/Hermes/app/static/json/user.json', 'r') as file:
                id_user = json.load(file)
            query = "INSERT INTO servers (name, description, creator_user) VALUES (%s, %s, %s)"
            values = (name, description, id_user["ID"])
            DatabaseConnection.execute_query(query, values)
            self._reset_atributtes()
            return jsonify("Server creado correctamente")
        except Exception as e:
            return jsonify(f"Error: {e}")
    
    def calling_servers(self):
        try:
            with open('C:/Users/Mauro/Documents/CODE/Proyectos/Hermes/app/static/json/user.json', 'r') as file:
                id_user = json.load(file)
            values = (id_user["ID"],)
            query = "SELECT id_server, name FROM servers WHERE creator_user = %s"
            item_servers = DatabaseConnection.fetch_all(query, values)
            print(item_servers)
            return jsonify(item_servers)
        except Exception as e:
            return jsonify(f"Error: {e}")


    def _reset_atributtes(self):
        self._name = None
        self._description = None
        self._image = None
        self._creator_user = None

class ChannelsController:
    def __init__(self):
        self._name = None
        self._description = None
        self._creator_server = None
    
    def create_channels(self, data):
        name = data.get('name')
        description = data.get('description')
        
        if not name and not description:
            return jsonify("Faltan Datos")

        try:
            with open ('C:/Users/Mauro/Documents/CODE/Proyectos/Hermes/app/static/json/server.json', 'r') as file:
                id_server = json.load(file)
            query = "INSERT INTO channels (name, description, creator_server) VALUES (%s, %s, %s)"
            values = (name, description, id_server["ID"])
            DatabaseConnection.execute_query(query, values)
            self._reset_atributtes()
            return jsonify("Channel creado correctamente")
        except Exception as e:
            return jsonify(f"Error: {e}")

    def saveid_channel(self, data):
        self._creator_server = data.get('creator_server')
        if self._creator_server is not None:
            user_data = {'ID': self._creator_server}
            with open('C:/Users/Mauro/Documents/CODE/Proyectos/Hermes/app/static/json/server.json', 'w') as file:
                json.dump(user_data, file, indent=4)
            return jsonify({"message": "El ID del canal se guardó correctamente"})
        else:
            return jsonify({"error": "No se capturó el ID del servidor"})

    def calling_channels(self):
        try:
            with open('C:/Users/Mauro/Documents/CODE/Proyectos/Hermes/app/static/json/server.json', 'r') as file:
                id_server = json.load(file)
            query = "SELECT id_channel, name FROM channels WHERE creator_server = %s"
            values = (id_server["ID"],)
            data_channel = DatabaseConnection.fetch_all(query, values)
            print(data_channel)
            return jsonify(data_channel)
        except Exception as e:
            return jsonify(f"Error: {e}")
        finally:
            self._reset_atributtes()

    def _reset_atributtes(self):
        self._name = None
        self._description = None
        self._creator_server = None

class ChatController:
    def __init__(self) -> None:
        self._message = None
        self._creationchannel = None
        self._creatoruser = None

    def create_chat(self, data):
        self._message = data.get('message')

        if not self._message:
            return jsonify("Faltan Datos")

        try:
            with open ('C:/Users/Mauro/Documents/CODE/Proyectos/Hermes/app/static/json/channel.json', 'r') as file:
                id_user_channel = json.load(file)
            query = "INSERT INTO chats (message, creation_channel, creation_user) VALUES (%s, %s, %s)"
            values = (self._message, id_user_channel["ID_Channel"], id_user_channel["ID_User"])
            DatabaseConnection.execute_query(query, values)
            self._reset_atributtes()
            return jsonify("Chat creado correctamente")
        except Exception as e:
            return jsonify(f"Error: {e}")

    def save_id_chat(self, data):
        self._creationchannel = data.get('creator_channel')
        if self._creationchannel is not None:
            with open ('C:/Users/Mauro/Documents/CODE/Proyectos/Hermes/app/static/json/user.json', 'r') as file:
                self._creatoruser = json.load(file)
            user_data = {'ID_Channel': self._creationchannel, 'ID_User': self._creatoruser["ID"]}
            with open('C:/Users/Mauro/Documents/CODE/Proyectos/Hermes/app/static/json/channel.json', 'w') as file:
                json.dump(user_data, file, indent=4)
            return jsonify({"message": "El ID del canal se guardó correctamente"})
        else:
            return jsonify({"error": "No se capturó el ID del canal"}) 

    def calling_chats(self):
        try:
            with open('C:/Users/Mauro/Documents/CODE/Proyectos/Hermes/app/static/json/channel.json', 'r') as file:
                id_channel = json.load(file)
            
            query = "SELECT * FROM chats WHERE creation_channel = %s"
            values = (id_channel["ID_Channel"],)
            data = DatabaseConnection.fetch_all(query, values)
            return jsonify(data)
        except FileNotFoundError:
            return jsonify("Error: Archivo no encontrado")
        except Exception as e:
            return jsonify(f"Error: {e}")

    def get_id_user(self):
        with open('C:/Users/Mauro/Documents/CODE/Proyectos/Hermes/app/static/json/user.json', 'r') as file:
            id_channel = json.load(file)
            return jsonify(id_channel)

    def _reset_atributtes(self):
        self._message = None
        self._creationchannel = None
        self._creatoruser = None