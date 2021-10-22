"use strict";
let nam = document.getElementById('name');
let age = document.getElementById('age');
let mail = document.getElementById('mail');
let tel = document.getElementById('tel');
let objSaveData = {};
let catchDataObj;





const putPlaceholder = () => {

  if (catchDataObj) {
    nam.value = catchDataObj.nombre;
    age.value = catchDataObj.edad;
    mail.value = catchDataObj.email;
    tel.value = catchDataObj.telefono;
  }
}


document.addEventListener("DOMContentLoaded", function (e) {

  const parseRedir = JSON.parse(localStorage.getItem('dataUser'));
  if (parseRedir === null) {
    window.location.href = "login.html";
  }
  catchDataObj = JSON.parse(localStorage.getItem("dataObj"))
  putPlaceholder();

  //boton guardar, guarda en objeto y en localstorage
  document.getElementById('save').addEventListener('click', () => {
    if(nam.value === "" || age.value === "" || mail.value === ""){
      document.getElementById('intMsj').innerHTML = `
<div class="alert alert-danger" role="alert">
  Ingrese los campos con * , son obligatorios!!
</div>`
    }else{
    objSaveData = {
      nombre: nam.value,
      edad: age.value,
      email: mail.value,
      telefono: tel.value
    }
    localStorage.setItem("dataObj", JSON.stringify(objSaveData))

    document.getElementById('intMsj').innerHTML = `
<div class="alert alert-primary" role="alert">
  Datos guardados satifactoriamente!!
</div>
`
  setTimeout(() => {
document.getElementById('intMsj').innerHTML = "";
}, 4000)
    }
  })






});