const btnUsuario = document.getElementById("user");
const btnChat = document.getElementById("chat");
const btnMensaje = document.getElementById("message");
const btnToTop = document.getElementById('btnToTop');
const btn = btnToTop.getElementsByTagName('button')[0];

btnUsuario.addEventListener("click", () => {
    const contenedorUsuario = document.getElementsByClassName("user")[0];
    const content = contenedorUsuario.getElementsByClassName("endpoint-content")[0];

    if(content.style.display === "block")
        content.style.display = "none";
    else
        content.style.display = "block";
})

btnChat.addEventListener("click", () => {
    const contenedorUsuario = document.getElementsByClassName("chat")[0];
    const content = contenedorUsuario.getElementsByClassName("endpoint-content")[0];
    
    if(content.style.display === "block")
        content.style.display = "none";
    else
        content.style.display = "block";
})

btnMensaje.addEventListener("click", () => {
    const contenedorUsuario = document.getElementsByClassName("message")[0];
    const content = contenedorUsuario.getElementsByClassName("endpoint-content")[0];
    
    if(content.style.display === "block")
        content.style.display = "none";
    else
        content.style.display = "block";
})

onscroll = () => {
    scrollTop();
}

btn.addEventListener("click", () => {
    goTo(0);
})

const scrollTop = () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btnToTop.style.display = "block";
    } else {
        btnToTop.style.display = "none";
    }
}

const goTo = (direccionY) => {
    document.body.scrollTop = direccionY; 
    document.documentElement.scrollTop = direccionY;
}