
let resJson;//array donde se van a guardar todos los comentarios mas los que se agreguen
let introd = document.getElementById('com');
let introdDesc = document.getElementById('desc');

const putInfo = (descProduct) => {
    introdDesc.innerHTML = "";
    introdDesc.innerHTML +=
        `<dl>
  <dt><h2>`+ descProduct.name + `</h2></dt>
  <br>
  <dt>Categoria:</dt>
  <dd>`+ descProduct.category + `</dd>
  <dt>Descripcion:</dt>
  <dd>`+ descProduct.description + `</dd>
  <dt>Costo:</dt>
  <dd>`+ descProduct.currency + ` ` + descProduct.cost + `</dd>
  <dt>Vendidos:</dt>
  <dd>`+ descProduct.soldCount + `</dd>
</dl>
<div id="imgs"></div>
`
    let divImg = document.getElementById('imgs');
    for (let i of descProduct.images) {
        divImg.innerHTML += `<img class="car" src="` + i + `"></img>`
    }
}

const mostrarComent = (par) => {
    introd.innerHTML = `<hr><h3>Comentarios:</h3><br>`;
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
        introd.innerHTML +=
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

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL).then(function (result) {
        if (result.status === "ok") {
            putInfo(result.data);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
        if (result.status === "ok") {
            resJson = result.data;
        }
        mostrarComent(resJson);
    });

    //muestra usuario en comentarios!
    const parseRedir = JSON.parse(localStorage.getItem('dataUser'));
    let usr = document.getElementById('user');
    usr.innerHTML = parseRedir[0].user;

    let puntuacion = 1;
    let comentario = "";


    //toma puntaje y guardo
    document.getElementById('selecPunt').addEventListener('change', () => {
        puntuacion = document.getElementById('selecPunt').value;
    })
    //toma comentario lo guarda
    document.getElementById('ingDesc').addEventListener('input', () => {
        comentario = document.getElementById('ingDesc').value;
    })
    //boton inserta comentario, en el array agrego un objeto con las propiedades para poder iterar
    document.getElementById('inserComent').addEventListener('click', () => {
        let h = new Date();//fecha para ingreso coment
        let mes = h.getMonth() + 1;
        let fecha = h.getFullYear() + '-' + mes + '-' + h.getDate() + ' ' + h.getHours() + ':' + h.getMinutes() + ':' + h.getSeconds();

        let obj = {
            description: comentario,
            score: puntuacion,
            user: parseRedir[0].user,
            dateTime: fecha
        }
        resJson.push(obj)//agrego cometarios al array
        mostrarComent(resJson)//vuelvo a ejecutar para mostrar comentarios mas los agregados
    })
});