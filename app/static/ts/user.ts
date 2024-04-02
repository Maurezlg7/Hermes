class UserController {
    name: HTMLInputElement | null;
    phone: HTMLInputElement | null;
    email_r: HTMLInputElement | null;
    email_l: HTMLInputElement | null;
    password_r: HTMLInputElement | null;
    password_l: HTMLInputElement | null;
    btn_change: HTMLInputElement | null;
    btn_register: HTMLElement | null;
    btn_login: HTMLElement | null;

    constructor() {
        this.name = document.getElementById("name") as HTMLInputElement;
        this.phone = document.getElementById("phone") as HTMLInputElement;
        this.email_l = document.getElementById("email_l") as HTMLInputElement;
        this.email_r = document.getElementById("email_r") as HTMLInputElement;
        this.password_r = document.getElementById("password_r") as HTMLInputElement;
        this.password_l = document.getElementById("password_l") as HTMLInputElement;
        this.btn_change = document.getElementById("reg-log") as HTMLInputElement;
        this.btn_register = document.getElementById("btn-register");
        this.btn_login = document.getElementById("btn-login");


        this.btn_register?.addEventListener("click", () => { this.send_data() });
        this.btn_login?.addEventListener("click", () => { this.login_user() });
    }

    send_data() {
        if (this.name && this.phone && this.email_r && this.password_r) {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&+-])[A-Za-z\d@$!%*#?&+-]{8,}$/;
            if (!passwordRegex.test(this.password_r.value)) {
                console.error("La contraseña debe tener al menos 8 caracteres, incluyendo al menos un número y un carácter especial.");
                alert("La contraseña debe tener al menos 8 caracteres, incluyendo al menos un número y un carácter especial.");
                return;
            }
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.name.value,
                    phone: this.phone.value,
                    email: this.email_r.value,
                    password: this.password_r.value
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud.');
                }
                return response.json();
            })
            .then(data => {
                if (String(data) == "Usuario creado exitosamente") {
                    this.createPopup("Bienvenido/a " + this.name?.value);
                } else if (String(data) == "El usuario ya existe") {
                    this.createPopup(data);
                } else {
                    console.log("Mensaje del servidor:", String(data));
                }
                this.empty_data();
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error: " + error);
            });
        } else {
            alert("Todos los campos son obligatorios.");
            console.error("Todos los campos son obligatorios.");
        }
    }
    
    login_user() {
        if (this.email_l && this.password_l) {
            const email = this.email_l.value;
            const password = this.password_l.value;
            const data = JSON.stringify({ email, password });
    
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud.');
                }
                return response.json();
            })
            .then(data => {
                if (parseInt(data[0]) >= 1) {
                    window.location.href = '/app';
                } else if (String(data) == "Usuario incorrecto o no existe") {
                    this.createPopup(data);
                } else {
                    this.createPopup(data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error: " + error);
            });
        } else {
            alert("Todos los campos son obligatorios.");
            console.error("Todos los campos son obligatorios.");
        }
        this.empty_data();
    }

    createPopup(message: string): HTMLDivElement {
        const popup = document.createElement("div");
        const messageElement = document.createElement("h1");
        const btn_close = document.createElement("button");

        messageElement.textContent = message;
        messageElement.style.color = 'white';
        messageElement.style.fontFamily = 'Arial, sans-serif';
        messageElement.style.fontSize = '36px';
        messageElement.style.marginBottom = '20px';

        popup.style.backgroundColor = 'black';
        popup.style.border = '1px solid #ccc';
        popup.style.borderRadius = '10px';
        popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        popup.style.padding = '20px';
        popup.style.position = 'absolute';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.zIndex = '9999';

        btn_close.textContent = "Close";
        btn_close.style.backgroundColor = '#ffeba7';
        btn_close.style.color = 'black';
        btn_close.style.border = 'none';
        btn_close.style.borderRadius = '5px';
        btn_close.style.padding = '10px 20px';
        btn_close.style.cursor = 'pointer';
        btn_close.style.marginTop = '20px';

        if (this.btn_change !== null) {
            this.btn_change.checked = false;
        }

        btn_close.addEventListener('click', () => {
            popup.remove();
        });
        document.body.appendChild(popup);
        popup.appendChild(messageElement);
        popup.appendChild(btn_close);

        return popup;
    }

    empty_data() {
        if (this.name && this.phone && this.email_r && this.password_r && this.password_l) {
            this.name.value = "";
            this.phone.value = "";
            this.email_r.value = "";
            this.password_r.value = "";
            this.password_l.value = "";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const userController = new UserController();
});
