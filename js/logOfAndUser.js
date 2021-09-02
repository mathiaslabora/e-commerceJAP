const logOf = () => {
    localStorage.clear();
    window.location.reload();
  }   
  const parseRedir = JSON.parse(localStorage.getItem('dataUser'));
  if (parseRedir === null) {
    window.location.href = "login.html";
  }
  
  document.addEventListener("DOMContentLoaded", async function (e) {
    
  document.getElementById("cerrar").addEventListener("click", logOf)//escucha boton cerrar sesion

  const parsedat = JSON.parse(localStorage.getItem('dataUser'));

  //muestra nombre de usuario en barra nav
  let ingUsu = document.getElementById('showUser')
  ingUsu.innerHTML = parsedat[0].user;



  })