"use strict";
class Home {
    constructor() {
        var _a;
        this.btn_login = document.getElementById("btn_ingresar");
        (_a = this.btn_login) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => { this.go_login(); });
    }
    go_login() {
        window.location.href = '/user';
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const home = new Home();
});
