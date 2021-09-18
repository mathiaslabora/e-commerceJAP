
let defOrd = 'REL';
let priceFrom;
let priceTo;
let prodFilt;
let listado = document.getElementById('listadoColeccion');
const createListOfProd = (productos) => {
    listado.innerHTML = "";
    for (let key of productos) {
        const lista = document.createElement('a');
        lista.href = "product-info.html";
        lista.classList.add('list-group-item-action')
        lista.innerHTML = `<div class="row prodSt">
        <div class="col-3">
            <img src="` + key.imgSrc + `" alt="` + key.description + `" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">`+ key.name + `</h2>
                <small class="text-muted">` + key.soldCount + ` vendidos</small>
            </div>
            <p class="mb-1">` + key.description + `</p><br>
            <p class="mb-1">` + key.currency + ` ` + key.cost + `</p>
        </div>
    </div>`
        listado.appendChild(lista)
            }
            localStorage.setItem("arrayProductos", JSON.stringify(prodFilt))//guardo array de productos en localStorage
}

function ordPorPrecioYRel(array, defOrd) {
    defOrd === 'AZ' ? array.sort((a, b) => {
        return a.cost - b.cost
    })
        : defOrd === 'ZA' ? array.sort((a, b) => {
            return b.cost - a.cost
        })
            : array.sort((a, b) => {
                if (a.soldCount < b.soldCount) { return 1 }
                else { return -1 }
                return 0;
            })
    return createListOfProd(array)
}

//funcion para el filter
function dentroDeRango(products) {
    return products.cost >= priceFrom && products.cost <= priceTo
}
//funcion de filtrado
function filtradoPorPrecio(productos) {
    prodFilt = productos.filter(dentroDeRango)//guardo los prod filtrados asi se pueden ordenar despues de filtrados
    createListOfProd(prodFilt)
}

document.addEventListener("DOMContentLoaded", async function (e) {

    const products = (await getJSONData(PRODUCTS_URL)).data //traigo el json correspondiente
    prodFilt = products;
    ordPorPrecioYRel(prodFilt, defOrd) //se ordena en ingreso por relevancia

    //siguientes botones orden precio mayor menor y relevancia:
    document.getElementById('AZ').addEventListener('click', () => {
        defOrd = 'AZ';
        if (prodFilt.length != 0) {
            ordPorPrecioYRel(prodFilt, defOrd)
        }
    })
    document.getElementById('ZA').addEventListener('click', () => {
        defOrd = 'ZA';
        if (prodFilt.length != 0) {
            ordPorPrecioYRel(prodFilt, defOrd)
        }
    })
    document.getElementById('REL').addEventListener('click', () => {
        defOrd = 'REL';
        if (prodFilt.length != 0) {
            ordPorPrecioYRel(prodFilt, defOrd)
        }
    })
    //cambia valores en form de input -desde-
    document.getElementById('from').addEventListener('input', () => {
        priceFrom = document.getElementById('from').value;
    })
    //cambia valores en form de input -hasta-
    document.getElementById('to').addEventListener('input', () => {
        priceTo = document.getElementById('to').value;
    })
    //siguiente filtrado por predio desde hasta:
    document.getElementById('filter').addEventListener('click', () => {
        if ((priceTo && priceFrom) === "") {
            ordPorPrecioYRel(prodFilt, defOrd)
        } else if (parseInt(priceFrom) > parseInt(priceTo)) {
            alert('Ingrese precio mas bajo en DESDE y mas alto en HASTA!!')
        } else if (((parseInt(priceFrom) === 0) && (parseInt(priceTo) === 0))) {
            listado.innerHTML = `<h2>No hay productos para ese rango de precios!!</h2>`
        } else {
            filtradoPorPrecio(products)
            if (prodFilt.length === 0) {
                listado.innerHTML = `<h2>No hay productos para ese rango de precios!!</h2>`
            }
        }
    })
})
