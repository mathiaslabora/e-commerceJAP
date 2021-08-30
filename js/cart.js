//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    const parseRedir = JSON.parse(localStorage.getItem('dataUser'));
    if (parseRedir === null) {
      window.location.href = "login.html";
    }
});