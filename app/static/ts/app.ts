class App {
    btn_create_server: HTMLElement | null;
    btn_search_server: HTMLElement | null;
    btn_create_channel: HTMLElement | null;
    btn_create_chat: HTMLElement | null;
    input_name_server: HTMLInputElement | null;
    input_description_server: HTMLInputElement | null;
    input_name_channel: HTMLInputElement | null;
    input_description_channel: HTMLInputElement | null;
    input_chat_message: HTMLInputElement | null;
    column_servers: HTMLElement | null;
    column_channels: HTMLElement | null;
    column_chats: HTMLElement | null;
    user_name: HTMLElement | null;
    popupAbierto_server: boolean;
    popupAbierto_channel: boolean;

    constructor() {
        this.btn_create_server = document.getElementById("add-server");
        this.btn_search_server = document.getElementById("search-server");
        this.btn_create_channel = document.getElementById("create_channel");
        this.btn_create_chat = document.getElementById("create_chat");
        this.column_servers = document.getElementById("list-servers");
        this.column_channels = document.getElementById("data_user");
        this.column_chats = document.getElementById("conteiner_chat");
        this.user_name = document.getElementById("user_name");
        this.input_chat_message = document.getElementById("input_nombre_channel") as HTMLInputElement;

        this.popupAbierto_server = false;

        this.view_server();
        this.view_channels();
        this.view_chats();

        if (this.btn_create_server) {
            this.btn_create_server.addEventListener("click", () => {
                if (!this.popupAbierto_server) {
                    this.popup_create_sv();
                    this.popupAbierto_server = true;
                }
            });
        }
        if(this.btn_create_channel){
            this.btn_create_channel.addEventListener("click", () =>{
                if(!this.popupAbierto_channel){
                    this.popup_create_ch();
                    this.popupAbierto_channel = true;
                }
            });
        }
        if(this.btn_create_chat){
            this.btn_create_chat.addEventListener("click", () => {
                this.create_chats();
            });
        }
    }
    
    /*CREATION SERVERS*/
    create_server() {
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
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al crear el servidor.');
            }
            return response.json();
        })
        .then(data => {
            this.empty_data();
            if (this.popupAbierto_server) {
                this.popupAbierto_server = false;
            }
            window.location.reload();
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    }


    /*CREATION CHANNELS*/
    create_channels(){
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
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al crear el servidor.');
            }
            return response.json();
        })
        .then(data => {
            this.empty_data();
            if (this.popupAbierto_server) {
                this.popupAbierto_server = false;
            }
            window.location.reload();
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    }

    /*CREATION CHATS*/
    create_chats(){
        if(this.input_chat_message){
            const messageValue = this.input_chat_message.value;
            if(messageValue.trim() !== "") {
                fetch('/chat_add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: messageValue
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Hubo un problema al crear el servidor.');
                    }
                    return response.json();
                })
                .then(data => {
                    this.empty_data();
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error: ', error);
                });
            } else {
                console.log("El mensaje está vacío");
            }
        } else {
            console.log("El elemento input no se ha encontrado");
        }
    }
        

    /*CALLING OF THE SERVERS TO THE FRONTED */
    view_server() {
        fetch('/view_servers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al obtener los servidores.');
            }
            return response.json();
        })
        .then(data => {
            this.view_style_servers(data);
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    }

    /*CALLING OF THE CHANNELS TO THE FRONTED */
    view_channels(){
        fetch('/view_channels', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al obtener los canales.');
            }
            return response.json();
        })
        .then(data => {
            this.view_style_channels(data)
        })
        .catch(error => {
            console.error('Error => ', error);
        });
    }

    /*CALLING OF THE CHATS TO THE FRONTED */
    view_chats(){
        fetch('/view_chats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al obtener los canales.');
            }
            return response.json();
        })
        .then(data => {
            console.log("Tipo de dato de data:", typeof data);
            this.view_style_chats(data);
        })
        .catch(error => {
            console.error('Error => ', error);
        });
    }

    /*ASIGNED STYLE FOR THE SERVERS*/
    view_style_servers(data) {
        data.forEach(server => {
            const server_item = document.createElement("div");
            const btn_server_item = document.createElement("button");
            const img_server_item = document.createElement("img");
            const span_server_item = document.createElement("span");

            server_item.className = "server-item";
            btn_server_item.className = "server-button";
            img_server_item.src = "C:/Users/Mauro/Documents/CODE/Proyectos/Hermes/app/static/img/Logo_Hermes.png";
            img_server_item.alt = "";
            span_server_item.innerHTML = server[1];

            btn_server_item.setAttribute("data-id", server[0]);

            btn_server_item.addEventListener("click", () => {
                const serverId = btn_server_item.getAttribute("data-id");
                console.log("Se hizo clic en el servidor con ID:", serverId);
                if (serverId !== null) {
                    this.saved_id_channel(parseInt(serverId));
                    console.log(parseInt(serverId));
                    window.location.reload();
                }else{
                    console.log("Es null");
                }
                
            });

            this.column_servers?.appendChild(server_item);
            server_item.appendChild(btn_server_item);
            server_item.appendChild(span_server_item);
            btn_server_item.appendChild(img_server_item);
        });
    }

    /*ASIGNED STYLE FOR THE CHANNELS */
    view_style_channels(data) {
        data.forEach(channel => {
            const container_channel = document.createElement("div");
            const span_channel = document.createElement("span");
    
            container_channel.className = "channels";
            span_channel.innerHTML = channel[1];
    
            container_channel.setAttribute("data-id", channel[0]);
    
            container_channel.addEventListener("click", () => {
                const channelId = container_channel.getAttribute("data-id");
                console.log("Se hizo clic en el canal con ID:", channelId);
                if (channelId !== null) {
                    this.saved_id_chat(parseInt(channelId));
                    console.log(parseInt(channelId));
                } else {
                    console.log("El ID del canal es nulo");
                }
            });
    
            this.column_channels?.appendChild(container_channel);
            container_channel.appendChild(span_channel);
        });
    }    

    /*ASIGNED STYLE FOR THE CHATS */
    view_style_chats(data){
        let userID = "";

        fetch('/get_id_user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al obtener los canales.');
            }
            return response.json();
        })
        .then(data => {
            userID = data;
        })
        .catch(error => {
            console.error('Error => ', error);
        });


        // Procesar los chats y asignar la clase adecuada
        data.forEach(chat => {
            const container_chat = document.createElement("div");
            const message_p = document.createElement("p");

            message_p.innerHTML = chat[1];

            if (chat.creation_user === userID["ID"]) {
                container_chat.className = "receptor";
            } else {
                container_chat.className = "emisor";
            }

            container_chat.appendChild(message_p);
            this.column_chats?.appendChild(container_chat);
        });
    }

    /*SAVED ID FOR THE CREATE CHANNELS */
    saved_id_channel(id_server:number){
        fetch('/channel_id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                creator_server: id_server
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al crear el servidor.');
            }
            return response.json();
        })
        .then(data => {
            console.log("Listo, ID: " + id_server)
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    }

    /*SAVED ID FOR THE CREATE CHATS */
    saved_id_chat(id_channel:number){
        fetch('/chat_id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                creator_channel: id_channel
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al crear el servidor.');
            }
            return response.json();
        })
        .then(data => {
            console.log("Listo, ID: " + id_channel)
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    }

    /*FORM OR POPUP FOR THE CREATE SERVER */
    popup_create_sv() {
        const background = document.createElement("div");
        const container = document.createElement("div");
        const btn_close = document.createElement("button");
        const input_name = document.createElement("input");
        const input_description = document.createElement("input");
        const btn_create = document.createElement("button");

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

        btn_close.addEventListener("click", () => {
            document.body.removeChild(background);
            this.popupAbierto_server = false;
        });

        btn_create.addEventListener("click", () => {
            this.create_server();
        });

        document.body.appendChild(background);
        background.appendChild(container);
        container.appendChild(btn_close);
        container.appendChild(input_name);
        container.appendChild(input_description);
        container.appendChild(btn_create);

        // Mover la asignación de los elementos aquí
        this.input_name_server = document.getElementById("input_nombre") as HTMLInputElement;
        this.input_description_server = document.getElementById("input_description") as HTMLInputElement;
    }

    /*FROM OR POPUP FOR THE CREATION OF CHANNEL */
    popup_create_ch(){
        const background = document.createElement("div");
        const container = document.createElement("div");
        const btn_close = document.createElement("button");
        const input_name = document.createElement("input");
        const input_description = document.createElement("input");
        const btn_create = document.createElement("button");

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

        btn_close.addEventListener("click", () => {
            document.body.removeChild(background);
            this.popupAbierto_channel = false;
        });

        btn_create.addEventListener("click", () => {
            this.create_channels();
        });

        document.body.appendChild(background);
        background.appendChild(container);
        container.appendChild(btn_close);
        container.appendChild(input_name);
        container.appendChild(input_description);
        container.appendChild(btn_create);

        this.input_name_channel = document.getElementById("input_nombre_channel") as HTMLInputElement;
        this.input_description_channel = document.getElementById("input_description_channel") as HTMLInputElement;
    }

    /*EMPTY THE INPUTS*/
    empty_data() {
        if (this.input_name_server && this.input_description_server) {
            this.input_name_server.value = "";
            this.input_description_server.value = "";
        }
        if(this.input_name_channel && this.input_description_channel){
            this.input_name_channel.value = "";
            this.input_description_channel.value = "";
        }
        if(this.input_chat_message){
            this.input_chat_message.value = "";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const myApp = new App();
});
