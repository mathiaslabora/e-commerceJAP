let divPut = document.getElementById('putProd');
let tabPut = document.getElementById('putTableR');
let selectSendMetod = document.getElementById('metEnv');
let getO; //objeto ref al json

//arrays para extraer datos y poder utilizarlos y modificarlos:
let unitCost = [];
let nam = [];
let src = [];
let currency = [];
let tot = [];
let count = [];
//variables a utilizar:
let subTotal = 0;
let total;
let costSend = 0;
let typeCurrency = 'UYU';
let dolar = 40;

//funcion que guarda los datos del json en respectivos arrays,se iguala la moneda en caso que sea dolar a peso
const saveDat = () => {
  for (let i in getO) {
    for (let h of getO[i]) {
      count.push(h.count);
      tot.push(h.unitCost * h.count);
      currency.push(h.currency);
      nam.push(h.name);
      if (h.currency === "USD") {
        unitCost.push((h.unitCost) * dolar)
      } else {
        unitCost.push(h.unitCost)
      }
      src.push(h.src);
    }
  }
}
/* alternativa posible: 
i.forEach(articles => {
  count.push(articles.count);
  tot.push(articles.unitCost * articles.count);
  currency.push(articles.currency);
  nam.push(articles.name);
  if (articles.currency === "USD") {
    unitCost.push((articles.unitCost) * dolar)
  } else {
    unitCost.push(articles.unitCost)
  }
 src.push(articles.src);
}) */

//toma datos almacenados en los array con el indice correspondiente y muestra en pantalla:
const putDat = () => {
  divPut.innerHTML = "";
  for (let i in getO) {
    for (let h = 0; h < getO[i].length; h++) {
      tot[h] = unitCost[h] * count[h];
      divPut.innerHTML += `<div class="d-flex w-100 justify-content-between">
<div class="col"><img width='100px' src="${src[h]}" class="img-thumbnail">
<h4 class="mb-1">${nam[h]}</h4>
</div>
<div class="col">
<h5 class="mb-1">${typeCurrency} ${operCurr(unitCost[h])} C/U</h5>
<br>
<h5 class="mb-1">Total Articulos:${typeCurrency} ${operCurr(tot[h])}</h5>
</div>
<div class="col">
<label for="qElem${h}">Cantidad:
<input id="qElem${h}" class="sizeInput backColor" onchange="changeCoun(${h})" placeholder="${count[h]}" type="number" max="500" /></label>
</div> 
</div>
</div>
<hr>`
    }
  }
  //calculo con el for el subtotal sumando todos los totales por articulos.
  subTotal = 0;
  for (let i of tot) { subTotal += i };
  costSend = selectSendMetod.value;
  total = parseFloat(subTotal) + parseFloat(costSend);
  //creacion tabla con costos
  tabPut.innerHTML = `<tr>
    <th>Subtotal:</th>
    <td>${typeCurrency}  ${operCurr(subTotal)}</td>
    </tr>
    <tr>
    <th>Costo de envío:</th>
    <td>${typeCurrency} ${operCurr(costSend)}</td>
    </tr>
    <tr>
    <th>Costo Total:</th>
    <td>${typeCurrency} ${operCurr(total)}</td>
    </tr>`
}

//funcion que devuelve los precios en la moneda seleccionada 
const operCurr = (param) => {
  if (typeCurrency === 'USD') {
    return param / dolar;
  } else {
    return param;
  }
}
//funcion que utilizan los input creados con onchange en cada articulo agregado
const changeCoun = (o) => {
  count[o] = document.getElementById('qElem' + o).value;
  putDat();
}

document.addEventListener("DOMContentLoaded", async function (e) {
  const parseRedir = JSON.parse(localStorage.getItem('dataUser'));
  if (parseRedir === null) {
    window.location.href = "login.html";
  }
  const jsonbuy = await getJSONData(CART_BUY_URL);
  const jsonCatch = (await getJSONData(CART_INFO_URL)).data;
  getO = jsonCatch;
  saveDat();
  putDat();
  //metodo de envio:
  selectSendMetod.addEventListener('change', () => {
    putDat();
  })

  //boton compra:
  document.getElementById('buy').addEventListener('click', () => {
    //boton extra procesando su compra cuando click en comprar
    document.getElementById('messageSucc').innerHTML = `<button class="btn btn-primary" type="button" disabled>
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Procesando su compra...
  </button>`
    setTimeout(() => {
      //temporizador para mostrar mensaje exitoso del json
      document.getElementById('messageSucc').innerHTML = `<div class="alert alert-success">
  <strong>${jsonbuy.data.msg}</strong>
</div>`
//temporizador para borrar contenidos
      setTimeout(() => {
        document.getElementById('messageSucc').innerHTML = "";
      }, 4000)
    }, 5000)
  })
  //boton de tipo de moneda:
  document.getElementById('curr').addEventListener('change', () => {
    typeCurrency = document.getElementById('curr').value;
    putDat();
  })
});