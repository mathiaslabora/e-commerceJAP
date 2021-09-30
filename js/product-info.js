
let resultJson;//array donde se van a guardar todos los comentarios mas los que se agreguen
let jsonProd;
let introdComent = document.getElementById('com');
let introdDesc = document.getElementById('desc');

const putInfo = (descProduct) => {
    introdDesc.innerHTML = "";
    introdDesc.innerHTML +=
        `
        <h2>`+ descProduct.name + `</h2>
        <br>
        <div class="d-flex w-100 justify-content-between alignA">
        <dl>
  <dt>Categoria:</dt>
  <dd>`+ descProduct.category + `</dd>
   <dt>Costo:</dt>
  <dd>`+ descProduct.currency + ` ` + descProduct.cost + `</dd>
  <dt>Vendidos:</dt>
  <dd>`+ descProduct.soldCount + `</dd>
</dl>

<div id="carouselExampleCaptions1" class="carousel slide imgComment" data-ride="carousel">
        <div id= "imgs" class="carousel-inner">
         </div>

      <a class="carousel-control-prev" href="#carouselExampleCaptions1" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleCaptions1" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    </div>
    <br>
    <h4>Descripcion:</h4>
    <p>`+ descProduct.description + `</p>
`
    let divImg = document.getElementById('imgs');
    divImg.innerHTML = "";
    for (let i of descProduct.images) {
        if (divImg.innerHTML === "") {
            divImg.innerHTML +=
                ` <div class="carousel-item active">
         <img src="`+ i + `" class="d-block w-100" alt="...">
         <div class="carousel-caption d-none d-md-block">
         </div>
         </div>`
        } else {
            divImg.innerHTML +=
            `<div class="carousel-item">
         <img src="`+ i + `" class="d-block w-100" alt="..."> 
         <div class="carousel-caption d-none d-md-block">
         </div>
          </div>` }

    }
}

const showComent = (par) => {
    introdComent.innerHTML = `<hr><h3>Comentarios:</h3><br>`;
    for (let i of par) {//agrego las estrellas naranjas en base a la puntuacion
        let star = "";
        for (let x = 1; x <= i.score; x++) {
            star += `<span class="fa fa-star checked"></span> `
        }
        let calc = 5 - i.score;
        if (calc > 0) {//aqui agrego las estrellas vacias diferenciando la puntuacion con 5
            for (let u = 1; u <= calc; u++) {
                star += `<span class="fa fa-star"></span>`
            }
        }
        introdComent.innerHTML +=
            `      <div class="mb-3 col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ i.user + `</h4>
                            <div>
                            `+ star + `
                            </div>
                        </div>
                        <p class="mb-1">` + i.description + `<small> ` + i.dateTime + `</small></p>
                        </div>`;
    }
}

const relatedProducts = (param) => {
    const arrayProdRel = JSON.parse(localStorage.getItem('arrayProductos'));
    console.log(arrayProdRel)
    let prodRelInput = document.getElementById('putCarousel');
    prodRelInput.innerHTML = "";
    let cont;
    for (let i of param.relatedProducts) {
        console.log(i)
        cont = i - 1;
        if (prodRelInput.innerHTML === "") {
            prodRelInput.innerHTML +=
                ` <div class="carousel-item active">
          <img src="`+ arrayProdRel[cont].imgSrc + `" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>`+ arrayProdRel[cont].name + `</h5>
            <p>`+ arrayProdRel[cont].description + `</p>
          </div>
        </div>`
        } else {
            prodRelInput.innerHTML +=
            `<div class="carousel-item">
          <img src="`+ arrayProdRel[cont].imgSrc + `" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>`+ arrayProdRel[cont].name + `</h5>
            <p>`+ arrayProdRel[cont].description + `</p>
          </div>
        </div>` }
    }


}

document.addEventListener("DOMContentLoaded", function (e) {


    getJSONData(PRODUCT_INFO_URL).then(function (result) {
        if (result.status === "ok") {
            jsonProd = result.data;
        }
        putInfo(jsonProd);
        relatedProducts(jsonProd);
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
        if (result.status === "ok") {
            resultJson = result.data;
        }
        showComent(resultJson);
    });



    //muestra usuario en comentarios!
    const parseRedir = JSON.parse(localStorage.getItem('dataUser'));
    let usr = document.getElementById('user');
    let toUpperCase = parseRedir[0].user;
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    usr.innerHTML = capitalizeFirstLetter(toUpperCase)

    let score = 1;
    let comm = "";


    //toma puntaje y guardo
    document.getElementById('selecPunt').addEventListener('change', () => {
        score = document.getElementById('selecPunt').value;
    })
    //toma comentario lo guarda
    document.getElementById('ingDesc').addEventListener('input', () => {
        comm = document.getElementById('ingDesc').value;
    })
    //boton inserta comentario, en el array agrego un objeto con las propiedades para poder iterar
    document.getElementById('inserComent').addEventListener('click', () => {
        let date = new Date();//fecha para ingreso coment
        let mes = date.getMonth() + 1;
        let dateComp = date.getFullYear() + '-' + mes + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

        let obj = {
            description: comm,
            score: score,
            user: parseRedir[0].user,
            dateTime: dateComp
        }
        resultJson.push(obj)//agrego cometarios al array
        showComent(resultJson)//vuelvo a ejecutar para mostrar comentarios mas los agregados
        document.getElementById('ingDesc').value = "";
        document.getElementById('selecPunt').value = 1;
    })

});