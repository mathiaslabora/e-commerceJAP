//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const data = [];

const buttonSend = () => {
    const userText = document.getElementById('user');
    const passText = document.getElementById('pass');
    const user = userText.value;
    const pass = passText.value;
    if (!user || !pass) {
        alert("Debe ingresar ambos campos!");
    } else {
        data.push({
            user,
            pass
        })

        localStorage.setItem("dataUser", JSON.stringify(data))
        window.location.href = "index.html";//redirecciona la pag hacia index.html
        userText.value = "";
        passText.value = "";
    }
}
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("enviar").addEventListener("click", buttonSend);//ejecuta por medio del boton cuando click la funcion correspondiente
});