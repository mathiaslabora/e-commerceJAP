//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const createListOfProd = (products) => {
    let listCreate = document.getElementById('listHtmlCollection');
    for (let key of products) {
        const lista = document.createElement('ul');
        const li = document.createElement("li")
        li.appendChild(document.createTextNode(`${key.name}`))
        lista.appendChild(li)

        let liDesc = document.createElement('ul');
        liDesc.innerHTML = (`<li>Descripcion: ` + key.description + `</li>         
        <li>Costo: `+ key.currency + ` ` + key.cost + `</li> 
        <li>Vendidos: `+ key.soldCount + `</li> 
        <li> <img src='`+ key.imgSrc + `' alt='imagen autos'></li> `)
        lista.appendChild(liDesc)
        listCreate.appendChild(lista)
    }
}
document.addEventListener("DOMContentLoaded", async function (e) {
    const obtDiv = document.getElementsByTagName('div')[1]; //guarda el div creado por jap.
    obtDiv.innerHTML = ''; //borro contenido dentro del div
    let createP = document.createElement('p');
    obtDiv.appendChild(createP).id = 'listHtmlCollection'; /*creo un nuevo parrafo que contendra el listado 
    y le doy un id para utilizarlo con mas facilidad*/
    const products = (await getJSONData(PRODUCTS_URL)).data //traigo el json correspondiente
    createListOfProd(products) //ejecuto la funcion para la creacion del listado
})