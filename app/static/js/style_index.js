class Index{
    constructor(){
        this.btn_nav = document.getElementById("list_nav");

        this.btn_nav.addEventListener("click", () => {

        });
    }
    links(){
        const fondo = document.createElement("div");
        
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".toggle");

    if (!toggle) return;

    toggle.addEventListener("click", (event) => {
        event.stopPropagation(); // Evita que el evento se propague al document y cierre inmediatamente
        toggle.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
        if (!toggle.contains(event.target)) {
            toggle.classList.remove("active");
        }
    });
});

const textarea = document.getElementById("chatInput");
const chatboxInput = document.querySelector(".Chatbox_input");

textarea.addEventListener("input", function() {
    this.style.height = "5vh";
    this.style.height = this.scrollHeight + "px";
    chatboxInput.style.height = this.scrollHeight + 20 + "px";
});
