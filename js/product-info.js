//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let introd = document.getElementById('com');
const putInfo =()=>{

}

const mostrarComent = (par) => {
    introd.innerHTML = "";
    for (let i of par) {
        let star;
        if (i.score === 1) {
            star = `<span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
        } else if (i.score === 2) {
            star = `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
        } else if (i.score === 3) {
            star = `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
        } else if (i.score === 4) {
            star = `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>`
        } else {
            star = `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>`
        }

        introd.innerHTML +=
            `      <div class="mb-3 col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ i.user + `</h4>
                            <div class="text-muted">
                            `+ star + `
                            </div>
                        </div>
                        <p class="mb-1">` + i.description + `<small> ` + i.dateTime + `</small></p>
                        </div>`;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL).then(function(result){
        if (result.status === "ok"){
          putInfo(result.data);  
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(result){
        if (result.status === "ok"){
            mostrarComent(result.data);
        }
    });
    

});