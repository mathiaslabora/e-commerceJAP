//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const createListOfProd = (products) => {
    let listado = document.getElementById('listadoColeccion');
    listado.innerHTML = ''
        for (let key of products) {
        const lista = document.createElement('div');
        lista.innerHTML = `<div class="row prodSt">
        <div class="col-3">
            <img src="` + key.imgSrc + `" alt="` + key.description + `" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">`+ key.name + `</h2>
                <small class="text-muted">` + key.soldCount + ` artículos</small>
            </div>
            <p class="mb-1">` + key.description + `</p>
        </div>
    </div>`

        listado.appendChild(lista)
    }
}
document.addEventListener("DOMContentLoaded", async function (e) {
    const obtDiv = document.getElementsByTagName('div')[1]; //guarda el div contenedor de productos
    obtDiv.id = 'listadoColeccion';// le doy un id para utilizarlo con mas facilidad*/
    const products = (await getJSONData(PRODUCTS_URL)).data //traigo el json correspondiente
    createListOfProd(products) //ejecuto la funcion para la creacion del listado
})