const titulo = document.getElementById("tituloPag");
const corpo = document.getElementById("corpoPag");
const id = localStorage.getItem('atividadeSelecionada');
const descricao = document.getElementById('descricao');
const materialNecessario = document.getElementById('materialNecessario');
const materialIncluido = document.getElementById('materialIncluido');
const dificuldade = document.getElementById('dificuldade');
const localizacao = document.getElementById('localizacao');
const cardTitulo = document.getElementById('card-titulo');
const participantes = document.getElementById('participantes');
const idadeMin = document.getElementById('idadeMin');
const idadeMax = document.getElementById('idadeMax');
const pesoMin = document.getElementById('pesoMin');
const pesoMax = document.getElementById('pesoMax');
const altura = document.getElementById('altura');
const tempo = document.getElementById('tempo');
const avaliacao = document.getElementById('avaliacao');

const atividades = JSON.parse(localStorage.getItem('atividades'));
if (id) {
    const atividade = atividades.filter(post => post.id === JSON.parse(id));
    console.log(atividade);
    atividade.forEach((postData) => {
        titulo.innerHTML = postData.titulo;
        corpo.innerHTML = `<section class="hero-wrap hero-wrap-2"
     style="background-image: url('${postData.imagembg}'); background-size: cover;"
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
        
        participantes.innerHTML = postData.requisitos.participantes;
        idadeMin.innerHTML = postData.requisitos.idadeMin;
        idadeMax.innerHTML = postData.requisitos.idadeMax;
        pesoMin.innerHTML = postData.requisitos.pesoMin;
        pesoMax.innerHTML = postData.requisitos.pesoMax;
        altura.innerHTML = postData.requisitos.altura;
        tempo.innerHTML = postData.requisitos.tempo;
        let estrelas = 5 - postData.avaliacao;
        for(let i = 0; i < 5; i++){
            if(i === estrelas){
                const novo = `<input type="radio" name="clr1" style="--c:#005400;" disabled checked>`;
                avaliacao.innerHTML += novo;
            }else{
                const novo = `<input type="radio" name="clr1" style="--c:#005400;" disabled>`;
                avaliacao.innerHTML += novo;
            }
        }  
        });
} else {

}

//destaques

const postContainer2 = document.querySelector("#destaques");

const addCardClickListener = () => {
    const classCard = document.querySelectorAll('.card2');
    console.log(classCard);
    classCard.forEach((card) => {
        card.addEventListener('click', () => {
            const cardID = card.id;
            if (cardID) {
                localStorage.setItem('atividadeSelecionada', JSON.stringify(cardID));
                window.location.href = `AtividadeInfo.html`;
            }

        });

        const icons = card.querySelectorAll('.icon');
        icons.forEach(icon => {
            if (icon.id === "Terra") {
                icon.classList.add("fas", "fa-running");
            } else if (icon.id === "Água") {
                icon.classList.add("fas", "fa-water");
            } else if (icon.id === "Ar") {
                icon.classList.add("fas", "fa-wind");
            }
        });
    });

};

function createCardElement2(filteredData) {
    console.log(filteredData);
    const postElement2 = document.createElement("div");
    postElement2.classList.add("card2");
    postElement2.innerHTML = `
    <div class="card card2 atividades-card justify-content-end" id ="${filteredData[0].id}"
            style="background: url(${filteredData[0].imagem}); background-size: cover;">
            <div class="card-corpo">
            <h3 class="text-white texto-card-titulo" style="font-size: 150%;">${filteredData[0].titulo}</h3>
            <p class="text-white texto-card-corpo" style="font-size: 110%;">
                <i class='icon' id="${filteredData[0].categoria}" style='color: white'></i> ${filteredData[0].categoria} <i class="fa fa-clock-o" aria-hidden="true"></i> ${filteredData[0].tempo}
            </p>
            <div class="row">
                <div class="col-sm" style="padding-right:0%;">
                    <p class="text-white texto-card-corpo" style="font-size: 95%;"><span class="preco">${filteredData[0].preco}</span>€ / Pessoa</p>
                </div>
                <div class="col-sm">
                    <button type="button" class="btn btn-primary comprar">Comprar</button>
                </div>
            </div>
        </div>
    </div>
    `;
    return postElement2;
}

const postMethods2 = () => {
    const destaques = JSON.parse(localStorage.getItem("destaques"));
    const atv = JSON.parse(localStorage.getItem("atividades"));
    if (destaques) {
        destaques.forEach((postData2) => {
            const filteredData = atv.filter(post => post.id === postData2.id);
            const postElement2 = createCardElement2(filteredData);
            postContainer2.appendChild(postElement2);
        });
        addCardClickListener();
    }
};

postMethods2();

const addCarrinho = document.getElementById('addCarrinho');

addCarrinho.addEventListener('click', () => {
    const userLogado = JSON.parse(localStorage.getItem('utilizadorLigado'));
    const atividadeSelect = JSON.parse(localStorage.getItem('atividadeSelecionada'));
    if (userLogado) {
        const reserva = { "id": atividadeSelect, participantes: "" ,"data":{"data": "", "hora": ""} }
        const reservas = JSON.parse(localStorage.getItem('carrinho'));
        if (reservas) {
            const reservasFiltered = reservas.find(post => post.email === userLogado.email);
            const reservaFind = reservasFiltered.atividades.find(post => post.id === reserva.id);
            if (reservaFind) {
                alert('Esta atividade já está no seu carrinho!');
            } else {
                reservas.find(item => item.email === userLogado.email).atividades.push(reserva);
                localStorage.setItem('carrinho', JSON.stringify(reservas));
                alert('Atividade adicionada ao carrinho com sucesso!');
            }
        }else{
            localStorage.setItem('carrinho', JSON.stringify([{email: userLogado.email, atividades:[reserva]}]));
        }

    } else {
        window.location.href = 'login.html';
    }
});

const verCarrinho = document.getElementById('verCarrinho');

verCarrinho.addEventListener('click', () =>{
    window.location.href = "carrinho.html";
})