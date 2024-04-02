var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.btn_create_server = document.getElementById("add-server");
        this.btn_search_server = document.getElementById("search-server");
        this.btn_create_channel = document.getElementById("create_channel");
        this.btn_create_chat = document.getElementById("create_chat");
        this.column_servers = document.getElementById("list-servers");
        this.column_channels = document.getElementById("data_user");
        this.column_chats = document.getElementById("conteiner_chat");
        this.user_name = document.getElementById("user_name");
        this.input_chat_message = document.getElementById("input_nombre_channel");
        this.popupAbierto_server = false;
        this.view_server();
        this.view_channels();
        this.view_chats();
        if (this.btn_create_server) {
            this.btn_create_server.addEventListener("click", function () {
                if (!_this.popupAbierto_server) {
                    _this.popup_create_sv();
                    _this.popupAbierto_server = true;
                }
            });
        }
        if (this.btn_create_channel) {
            this.btn_create_channel.addEventListener("click", function () {
                if (!_this.popupAbierto_channel) {
                    _this.popup_create_ch();
                    _this.popupAbierto_channel = true;
                }
            });
        }
        if (this.btn_create_chat) {
            this.btn_create_chat.addEventListener("click", function () {
                _this.create_chats();
            });
        }
    }
    /*CREATION SERVERS*/
    App.prototype.create_server = function () {
        var _this = this;
        if (!this.input_name_server || !this.input_description_server) {
            console.error('Alguno de los elementos input no se ha encontrado.');
            return;
        }
        fetch('/server_add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.input_name_server.value,
                description: this.input_description_server.value
            })
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Hubo un problema al crear el servidor.');
            }
            return response.json();
        })
            .then(function (data) {
            _this.empty_data();
            if (_this.popupAbierto_server) {
                _this.popupAbierto_server = false;
            }
            window.location.reload();
        })
            .catch(function (error) {
            console.error('Error: ', error);
        });
    };
    /*CREATION CHANNELS*/
    App.prototype.create_channels = function () {
        var _this = this;
        if (!this.input_name_channel || !this.input_description_channel) {
            console.error('Alguno de los elementos input no se ha encontrado.');
            return;
        }
        fetch('/channel_add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.input_name_channel.value,
                description: this.input_description_channel.value
            })
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Hubo un problema al crear el servidor.');
            }
            return response.json();
        })
            .then(function (data) {
            _this.empty_data();
            if (_this.popupAbierto_server) {
                _this.popupAbierto_server = false;
            }
            window.location.reload();
        })
            .catch(function (error) {
            console.error('Error: ', error);
        });
    };
    /*CREATION CHATS*/
    App.prototype.create_chats = function () {
        var _this = this;
        if (this.input_chat_message) {
            var messageValue = this.input_chat_message.value;
            if (messageValue.trim() !== "") {
                fetch('/chat_add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: messageValue
                    })
                })
                    .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Hubo un problema al crear el servidor.');
                    }
                    return response.json();
                })
                    .then(function (data) {
                    _this.empty_data();
                    window.location.reload();
                })
                    .catch(function (error) {
                    console.error('Error: ', error);
                });
            }
            else {
                console.log("El mensaje está vacío");
            }
        }
        else {
            console.log("El elemento input no se ha encontrado");
        }
    };
    /*CALLING OF THE SERVERS TO THE FRONTED */
    App.prototype.view_server = function () {
        var _this = this;
        fetch('/view_servers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Hubo un problema al obtener los servidores.');
            }
            return response.json();
        })
            .then(function (data) {
            _this.view_style_servers(data);
        })
            .catch(function (error) {
            console.error('Error: ', error);
        });
    };
    /*CALLING OF THE CHANNELS TO THE FRONTED */
    App.prototype.view_channels = function () {
        var _this = this;
        fetch('/view_channels', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Hubo un problema al obtener los canales.');
            }
            return response.json();
        })
            .then(function (data) {
            _this.view_style_channels(data);
        })
            .catch(function (error) {
            console.error('Error => ', error);
        });
    };
    /*CALLING OF THE CHATS TO THE FRONTED */
    App.prototype.view_chats = function () {
        var _this = this;
        fetch('/view_chats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Hubo un problema al obtener los canales.');
            }
            return response.json();
        })
            .then(function (data) {
            console.log("Tipo de dato de data:", typeof data);
            _this.view_style_chats(data);
        })
            .catch(function (error) {
            console.error('Error => ', error);
        });
    };
    /*ASIGNED STYLE FOR THE SERVERS*/
    App.prototype.view_style_servers = function (data) {
        var _this = this;
        data.forEach(function (server) {
            var _a;
            var server_item = document.createElement("div");
            var btn_server_item = document.createElement("button");
            var img_server_item = document.createElement("img");
            var span_server_item = document.createElement("span");
            server_item.className = "server-item";
            btn_server_item.className = "server-button";
            img_server_item.src = "C:/Users/Mauro/Documents/CODE/Proyectos/Hermes/app/static/img/Logo_Hermes.png";
            img_server_item.alt = "";
            span_server_item.innerHTML = server[1];
            btn_server_item.setAttribute("data-id", server[0]);
            btn_server_item.addEventListener("click", function () {
                var serverId = btn_server_item.getAttribute("data-id");
                console.log("Se hizo clic en el servidor con ID:", serverId);
                if (serverId !== null) {
                    _this.saved_id_channel(parseInt(serverId));
                    console.log(parseInt(serverId));
                    window.location.reload();
                }
                else {
                    console.log("Es null");
                }
            });
            (_a = _this.column_servers) === null || _a === void 0 ? void 0 : _a.appendChild(server_item);
            server_item.appendChild(btn_server_item);
            server_item.appendChild(span_server_item);
            btn_server_item.appendChild(img_server_item);
        });
    };
    /*ASIGNED STYLE FOR THE CHANNELS */
    App.prototype.view_style_channels = function (data) {
        var _this = this;
        data.forEach(function (channel) {
            var _a;
            var container_channel = document.createElement("div");
            var span_channel = document.createElement("span");
            container_channel.className = "channels";
            span_channel.innerHTML = channel[1];
            container_channel.setAttribute("data-id", channel[0]);
            container_channel.addEventListener("click", function () {
                var channelId = container_channel.getAttribute("data-id");
                console.log("Se hizo clic en el canal con ID:", channelId);
                if (channelId !== null) {
                    _this.saved_id_chat(parseInt(channelId));
                    console.log(parseInt(channelId));
                }
                else {
                    console.log("El ID del canal es nulo");
                }
            });
            (_a = _this.column_channels) === null || _a === void 0 ? void 0 : _a.appendChild(container_channel);
            container_channel.appendChild(span_channel);
        });
    };
    /*ASIGNED STYLE FOR THE CHATS */
    App.prototype.view_style_chats = function (data) {
        var _this = this;
        var userID = "";
        fetch('/get_id_user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Hubo un problema al obtener los canales.');
            }
            return response.json();
        })
            .then(function (data) {
            userID = data;
        })
            .catch(function (error) {
            console.error('Error => ', error);
        });
        // Procesar los chats y asignar la clase adecuada
        data.forEach(function (chat) {
            var _a;
            var container_chat = document.createElement("div");
            var message_p = document.createElement("p");
            message_p.innerHTML = chat[1];
            if (chat.creation_user === userID["ID"]) {
                container_chat.className = "receptor";
            }
            else {
                container_chat.className = "emisor";
            }
            container_chat.appendChild(message_p);
            (_a = _this.column_chats) === null || _a === void 0 ? void 0 : _a.appendChild(container_chat);
        });
    };
    /*SAVED ID FOR THE CREATE CHANNELS */
    App.prototype.saved_id_channel = function (id_server) {
        fetch('/channel_id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                creator_server: id_server
            })
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Hubo un problema al crear el servidor.');
            }
            return response.json();
        })
            .then(function (data) {
            console.log("Listo, ID: " + id_server);
        })
            .catch(function (error) {
            console.error('Error: ', error);
        });
    };
    /*SAVED ID FOR THE CREATE CHATS */
    App.prototype.saved_id_chat = function (id_channel) {
        fetch('/chat_id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                creator_channel: id_channel
            })
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Hubo un problema al crear el servidor.');
            }
            return response.json();
        })
            .then(function (data) {
            console.log("Listo, ID: " + id_channel);
        })
            .catch(function (error) {
            console.error('Error: ', error);
        });
    };
    /*FORM OR POPUP FOR THE CREATE SERVER */
    App.prototype.popup_create_sv = function () {
        var _this = this;
        var background = document.createElement("div");
        var container = document.createElement("div");
        var btn_close = document.createElement("button");
        var input_name = document.createElement("input");
        var input_description = document.createElement("input");
        var btn_create = document.createElement("button");
        input_description.type = "text";
        input_description.placeholder = "Description";
        btn_close.textContent = "X";
        btn_create.textContent = "Create Server";
        background.className = "popup-background";
        container.className = "popup-container";
        btn_close.className = "popup-btn-close";
        input_name.className = "popup-input-name";
        btn_create.className = "popup-btn-create";
        input_description.className = "popup-input-name";
        input_name.placeholder = "Name of server";
        input_name.id = "input_nombre";
        input_description.id = "input_description";
        btn_close.addEventListener("click", function () {
            document.body.removeChild(background);
            _this.popupAbierto_server = false;
        });
        btn_create.addEventListener("click", function () {
            _this.create_server();
        });
        document.body.appendChild(background);
        background.appendChild(container);
        container.appendChild(btn_close);
        container.appendChild(input_name);
        container.appendChild(input_description);
        container.appendChild(btn_create);
        // Mover la asignación de los elementos aquí
        this.input_name_server = document.getElementById("input_nombre");
        this.input_description_server = document.getElementById("input_description");
    };
    /*FROM OR POPUP FOR THE CREATION OF CHANNEL */
    App.prototype.popup_create_ch = function () {
        var _this = this;
        var background = document.createElement("div");
        var container = document.createElement("div");
        var btn_close = document.createElement("button");
        var input_name = document.createElement("input");
        var input_description = document.createElement("input");
        var btn_create = document.createElement("button");
        input_description.type = "text";
        input_description.placeholder = "Description";
        btn_close.textContent = "X";
        btn_create.textContent = "Create channel";
        background.className = "popup-background";
        container.className = "popup-container";
        btn_close.className = "popup-btn-close";
        input_name.className = "popup-input-name";
        btn_create.className = "popup-btn-create";
        input_description.className = "popup-input-name";
        input_name.placeholder = "Name of channel";
        input_name.id = "input_nombre_channel";
        input_description.id = "input_description_channel";
        btn_close.addEventListener("click", function () {
            document.body.removeChild(background);
            _this.popupAbierto_channel = false;
        });
        btn_create.addEventListener("click", function () {
            _this.create_channels();
        });
        document.body.appendChild(background);
        background.appendChild(container);
        container.appendChild(btn_close);
        container.appendChild(input_name);
        container.appendChild(input_description);
        container.appendChild(btn_create);
        this.input_name_channel = document.getElementById("input_nombre_channel");
        this.input_description_channel = document.getElementById("input_description_channel");
    };
    /*EMPTY THE INPUTS*/
    App.prototype.empty_data = function () {
        if (this.input_name_server && this.input_description_server) {
            this.input_name_server.value = "";
            this.input_description_server.value = "";
        }
        if (this.input_name_channel && this.input_description_channel) {
            this.input_name_channel.value = "";
            this.input_description_channel.value = "";
        }
        if (this.input_chat_message) {
            this.input_chat_message.value = "";
        }
    };
    return App;
}());
document.addEventListener("DOMContentLoaded", function () {
    var myApp = new App();
});
