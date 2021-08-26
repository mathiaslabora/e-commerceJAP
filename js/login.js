//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const data = [];
const userText = document.getElementById('user');
const passText = document.getElementById('pass');

const clean = () => {
    localStorage.setItem("dataUser", JSON.stringify(data))//guarda array "data" en localstorage
    window.location.href = "index.html";//redirecciona la pag hacia index.html
    //limpia los espacios de usuario y contraseña.
    userText.value = "";
    passText.value = "";
}
//funcion que impide avanzar al index si los campos de usuario y constraseña estan vacios
const buttonSend = () => {
    const user = userText.value;
    const pass = passText.value;
    if (!user || !pass) {
        alert("Debe ingresar ambos campos!");
    } else {
        data.push({
            user,
            pass
        })
    
    clean()
    }
}



document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("enviar").addEventListener("click", buttonSend);

});