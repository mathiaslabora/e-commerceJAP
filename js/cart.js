let divPut = document.getElementById('putProd');
let getO = [];//obtengo el array del json que traemos.
let unitCost = [];
let nam = [];
let src = [];
let currency = [];
let tot = [];
let count = [];

const saveDat = () => {
  for (let i of getO) {
    i.forEach(articles => {
      count.push(articles.count);
      tot.push(articles.unitCost * articles.count);
      currency.push(articles.currency);
      nam.push(articles.name);
      unitCost.push(articles.unitCost)
      src.push(articles.src);
    })
  }
}

const putDat = () => {
  divPut.innerHTML = "";
  for (let h = 0; h <= getO.length; h++) {
    tot[h] = unitCost[h] * count[h]
    divPut.innerHTML += `<div class="d-flex w-100 justify-content-between">
<div class="col"><img width='100px' src="${src[h]}" class="img-thumbnail">
<h4 class="mb-1">${nam[h]}</h4>
</div>
<div class="col">
<h5 class="mb-1">${currency[h]} ${unitCost[h]} C/U</h5>
<br>
<h4 class="mb-1">Total Articulo:${tot[h]}</h4>
</div>
<div class="col">
<small>Cantidad:${count[h]}</small><br>
<input id="qElem${h}" class="sizeInput" onchange="changeCoun(${h})" type="number" max="500" />
</div> 
</div>
</div>
<hr>`
  }
}

const changeCoun = (o) => {
  count[o] = document.getElementById('qElem' + o).value;
  putDat()
  console.log(tot[o], count)
}

document.addEventListener("DOMContentLoaded", async function (e) {
  const parseRedir = JSON.parse(localStorage.getItem('dataUser'));
  if (parseRedir === null) {
    window.location.href = "login.html";
  }

  const jsonCatch = await getJSONData(CART_INFO_URL);
  getO.push(jsonCatch.data.articles);
  saveDat();
  putDat();

});