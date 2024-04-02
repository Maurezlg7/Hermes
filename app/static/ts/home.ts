class Home{
    btn_login : HTMLElement | null;

    constructor(){
        this.btn_login = document.getElementById("btn_ingresar")

        this.btn_login?.addEventListener("click", () => {this.go_login()});
    }
    go_login(){
        window.location.href = '/user';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const home = new Home();
});