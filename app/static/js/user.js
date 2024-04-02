var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        var _a, _b;
        this.name = document.getElementById("name");
        this.phone = document.getElementById("phone");
        this.email_l = document.getElementById("email_l");
        this.email_r = document.getElementById("email_r");
        this.password_r = document.getElementById("password_r");
        this.password_l = document.getElementById("password_l");
        this.btn_change = document.getElementById("reg-log");
        this.btn_register = document.getElementById("btn-register");
        this.btn_login = document.getElementById("btn-login");
        (_a = this.btn_register) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { _this.send_data(); });
        (_b = this.btn_login) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { _this.login_user(); });
    }
    UserController.prototype.send_data = function () {
        var _this = this;
        if (this.name && this.phone && this.email_r && this.password_r) {
            var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&+-])[A-Za-z\d@$!%*#?&+-]{8,}$/;
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
                .then(function (response) {
                if (!response.ok) {
                    throw new Error('Error en la solicitud.');
                }
                return response.json();
            })
                .then(function (data) {
                var _a;
                if (String(data) == "Usuario creado exitosamente") {
                    _this.createPopup("Bienvenido/a " + ((_a = _this.name) === null || _a === void 0 ? void 0 : _a.value));
                }
                else if (String(data) == "El usuario ya existe") {
                    _this.createPopup(data);
                }
                else {
                    console.log("Mensaje del servidor:", String(data));
                }
                _this.empty_data();
            })
                .catch(function (error) {
                console.error('Error:', error);
                alert("Error: " + error);
            });
        }
        else {
            alert("Todos los campos son obligatorios.");
            console.error("Todos los campos son obligatorios.");
        }
    };
    UserController.prototype.login_user = function () {
        var _this = this;
        if (this.email_l && this.password_l) {
            var email = this.email_l.value;
            var password = this.password_l.value;
            var data = JSON.stringify({ email: email, password: password });
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            })
                .then(function (response) {
                if (!response.ok) {
                    throw new Error('Error en la solicitud.');
                }
                return response.json();
            })
                .then(function (data) {
                if (parseInt(data[0]) >= 1) {
                    window.location.href = '/app';
                }
                else if (String(data) == "Usuario incorrecto o no existe") {
                    _this.createPopup(data);
                }
                else {
                    _this.createPopup(data);
                }
            })
                .catch(function (error) {
                console.error('Error:', error);
                alert("Error: " + error);
            });
        }
        else {
            alert("Todos los campos son obligatorios.");
            console.error("Todos los campos son obligatorios.");
        }
        this.empty_data();
    };
    UserController.prototype.createPopup = function (message) {
        var popup = document.createElement("div");
        var messageElement = document.createElement("h1");
        var btn_close = document.createElement("button");
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
        btn_close.addEventListener('click', function () {
            popup.remove();
        });
        document.body.appendChild(popup);
        popup.appendChild(messageElement);
        popup.appendChild(btn_close);
        return popup;
    };
    UserController.prototype.empty_data = function () {
        if (this.name && this.phone && this.email_r && this.password_r && this.password_l) {
            this.name.value = "";
            this.phone.value = "";
            this.email_r.value = "";
            this.password_r.value = "";
            this.password_l.value = "";
        }
    };
    return UserController;
}());
document.addEventListener("DOMContentLoaded", function () {
    var userController = new UserController();
});
