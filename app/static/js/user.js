import Services from "../services/services.js";

class Users {
    constructor() {
        this.service = new Services();
        this.Send_Login();
        this.Send_Register();
    }

    Send_Register(){
        document.getElementById("btn-register").addEventListener("click", () => this.register());
    }

    Send_Login() {
        document.getElementById("btn-login").addEventListener("click", () => this.login());
    }

    async login() {
        const email_login = document.getElementById("email_login").value;
        const password_login = document.getElementById("password_login").value;
        
        if (!email_login || !password_login) {
            console.log("Por favor, completa ambos campos.");
            return;
        }

        const formData = {
            email: email_login,
            password: password_login
        };

        try {
            const respuesta = await this.service.M_POST(formData, "login");
            console.log("Respuesta del servidor:", respuesta);
            window.location.href = "/app";
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    }

    async register(){
        const name_register = document.getElementById("name").value;
        const phone_register = document.getElementById("phone").value;
        const email_register = document.getElementById("email_register").value;
        const password_register = document.getElementById("password_register").value;

        if (!name_register || !phone_register || !email_register || !password_register) {
            console.log("Por favor, completa todos los campos.");
            return;
        }

        let formData = {
            name: name_register,
            phone: phone_register,
            email: email_register,
            password: password_register
        };

        try{
            const respuesta = await this.service.M_POST(formData, "register");
            console.log("Respuesta del servidor:", respuesta);
        }catch(error){
            console.error("Error al enviar los datos:", error);
        }

    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Users();
});
