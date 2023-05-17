const titulo = document.getElementById("tituloPag");
const corpo = document.getElementById("corpoPag");
const id = localStorage.getItem('atividadeSelecionada');
const descricao = document.getElementById('descricao');
const materialNecessario = document.getElementById('materialNecessario');
const materialIncluido = document.getElementById('materialIncluido');
const dificuldade = document.getElementById('dificuldade');
const localizacao = document.getElementById('localizacao');
const cardTitulo = document.getElementById('card-titulo');
const opcoes = document.getElementById('opcoes');

const atividades = JSON.parse(localStorage.getItem('atividades'));
if (id) {
    const atividade = atividades.filter(post => post.id === JSON.parse(id));
    console.log(atividade);
    atividade.forEach((postData) => {
        titulo.innerHTML = postData.titulo;
        corpo.innerHTML = `<section class="hero-wrap hero-wrap-2"
     style="background-image: url('images/${postData.imagem}.jpeg'); background-size: cover;"
     data-stellar-background-ratio="0.5">
     <div class="overlay"></div>
     <div class="container">
         <div class="row no-gutters slider-text align-items-end" style="height: 400px; margin-top: -100px;">
             <div class="col-md-9 ftco-animate pb-5" class="text-white">
                 <p class="breadcrumbs mb-2"><span class="mr-2"><a href="atividades.html" class="text-white">Atividades <i
                                 class="ion-ios-arrow-forward"></i></a></span> <span class="text-white">${postData.titulo}<i
                             class="ion-ios-arrow-forward"></i></span></p>
                 <h1 class="mb-0 bread text-white">${postData.titulo}</h1>
             </div>
         </div>
     </div>
 </section>`
        descricao.innerHTML = postData.descricao;
        postData.materialNecessario.forEach((material) => {
            const novoCodigo = `<p>- ${material}</p>`;
            materialNecessario.innerHTML += novoCodigo;
        });
        postData.materialIncluido.forEach((material) => {
            const novoCodigo = `<p>- ${material}</p>`;
            materialIncluido.innerHTML += novoCodigo;
        });
        dificuldade.innerHTML = postData.dificuldade;
        localizacao.innerHTML = postData.localizacao;
        cardTitulo.innerHTML = postData.titulo;
        const primeiro = postData.pacotes[0];
        postData.pacotes.forEach((material) => {
            if(material === primeiro){
                const novoCodigo = `<div class="col-sm mb-10">
                            <input class="botaoEscolha" type="radio" name="escolher" style="--c:#005400;"
                checked>
            <label for="opcao1" style="margin-bottom:16px;">${material.nomePacote}</label>
        </div>
        <div class="col-sm mb-10">
            <p id="preco">${material.preco}€/pessoa</p>
        </div>
        <div class="w-100"></div>`;
        opcoes.innerHTML += novoCodigo;
            }else{
                const novoCodigo = `<div class="col-sm mb-10">
                            <input class="botaoEscolha" type="radio" name="escolher" style="--c:#005400;">
            <label style="margin-bottom:16px;" for="opcao1">${material.nomePacote}</label>
        </div>
        <div class="col-sm">
            <p id="preco">${material.preco}€/pessoa</p>
        </div>
        <div class="w-100"></div>`;
        opcoes.innerHTML += novoCodigo;
            }
        });
            
            

    });
} else {

}

//destaques

const postContainer2 = document.querySelector("#destaques");

const createCardElement2 = (postData2) => {
    const postElement2 = document.createElement("div");
    postElement2.classList.add("card2");
    postElement2.innerHTML = `
    <div class="card card2 atividades-card justify-content-end"
            style="background: url(images/${postData2.imagem}.jpeg); background-size: cover;">
            <div class="card-corpo">
            <h3 class="text-white texto-card-titulo" style="font-size: 150%;">${postData2.titulo}</h3>
            <p class="text-white texto-card-corpo" style="font-size: 110%;">
                <i class='${postData2.icon}' style='color: white'></i> ${postData2.categoria} <i class="fa fa-clock-o" aria-hidden="true"></i> ${postData2.tempo}
            </p>
            <div class="row">
                <div class="col-sm" style="padding-right:0%;">
                    <p class="text-white texto-card-corpo" style="font-size: 95%;">Desde<br><span class="preco">${postData2.preco}</span>€ / Pessoa</p>
                </div>
                <div class="col-sm">
                    <button type="button" class="btn btn-primary comprar">Comprar</button>
                </div>
            </div>
        </div>
    </div>
    `;
    return postElement2;
};

const postMethods2 = async () => {
    const destaques = JSON.parse(localStorage.getItem("destaques"));
    if (destaques) {
        destaques.forEach((postData2) => {
            const postElement2 = createCardElement2(postData2);
            postContainer2.appendChild(postElement2);
        });
    }
};

postMethods2();


const categoriaSelecionada = localStorage.getItem('categoriaSelecionada');
if (categoriaSelecionada) {
    postMethodsFilter(categoriaSelecionada);
    dropdownButton.textContent = categoriaSelecionada;
    localStorage.removeItem("categoriaSelecionada");
} else {
    dropdownButton.textContent = 'Todos';
    postMethods();
}
