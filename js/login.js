//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const data = [];
const userText = document.getElementById('user');
const passText = document.getElementById('pass');

const clean = () => {
    sessionStorage.setItem("dataUser", JSON.stringify(data))
    window.location.href = "index.html";
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

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
  
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    const user = profile.getGivenName();
    const pass = profile.getFamilyName();
    data.push({
        user,
        pass
    })
  sessionStorage.setItem("dataUser", JSON.stringify(data))//guarda array "data" en localstorage
    window.location.href = "index.html";//redirecciona la pag hacia index.html
    //limpia los espacios de usuario y contraseña.
    userText.value = "";
    passText.value = "";
  }
  
  


document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("enviar").addEventListener("click", buttonSend);
});