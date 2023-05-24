const tudo = document.getElementById('carrinhoLista');
const marcacoes = JSON.parse(localStorage.getItem('reservas'));
const username = JSON.parse(localStorage.getItem('utilizadorLigado'));
const marcacoesFiltro = marcacoes.filter(post => post.user == username[0].user)

marcacoesFiltro.forEach(element => {
    const atv = JSON.parse(localStorage.getItem('atividades'));
    const atv1 = atv.filter(post => post.id == element.id)
    const codigo = `<div class="row nrPtc" id="${atv1[0].id}">
    <div class="col">
        <h4 class="pb-10" id="nome">${atv1[0].titulo}</h4>
        <img src="images/${atv1[0].imagem}.jpeg" id="imagem-carrinho">
    </div>
    <div class="col-5 meio">
        <div class="campos d-flex">
            <i class="fa-solid fa-calendar icones"></i>
            <div class="campo">
                <input type="date" id="data" class="campo1" placeholder="data">
            </div>
        </div>
        <div class="campos d-flex">
            <i class="fa-solid fa-clock icones"></i>
            <div class="campo">
                <input type="time" id="hora" class="campo1" placeholder="data">
            </div>
        </div>
        <div class="campos d-flex">
            <i class="fa-solid fa-person icones"></i>
            <p class="m-0" style="padding-top: 0.5%; padding-left: 1%;">Nº Pessoas</p>
            <div class="campo d-flex" >
                <button class="text-center text-white botaoAdd diminuir">-</button>
                    <input type="text" class="campo1 participantes" readonly>
                <button class="text-center text-white botaoAdd adicionar">+</button>
            </div>
        </div>
    </div>
    <div class="col-2 pt-90">
        <h5 id="preco">${atv1[0].preco * atv1[0].requisitos.participantes}€</h5>
    </div>
    <div class="col-2 pt-80">
        <span class="iconLixo"><i class="fa-solid fa-trash"></i></span>
    </div>
</div>
<hr class="linha">`;
    tudo.innerHTML += codigo;

});

const nrParticipantes = document.querySelectorAll('.nrPtc');

nrParticipantes.forEach(nr => {
    const atv = JSON.parse(localStorage.getItem('atividades'));
    const atv1 = atv.filter(post => post.id == nr.id);
    let campo = nr.querySelector('.participantes');
    let nrPart = atv1[0].requisitos.participantes;
    campo.value = nrPart;

    let preco = nr.querySelector('#preco');

    const adicionar = nr.querySelector('.adicionar');
    adicionar.addEventListener('click', () => {
        let p = campo.value;
        p++;
        campo.value = p;
        let preco1 = atv1[0].preco * p;
        preco.textContent = preco1.toFixed(2) + '€';
    });

    const diminuir = nr.querySelector('.diminuir');
    diminuir.addEventListener('click', () => {
        let p = campo.value;
        if (p > nrPart)
            p--;
        campo.value = p;
        let preco1 = atv1[0].preco * p;
        preco.textContent = preco1.toFixed(2) + '€';
    });

    const lixo = nr.querySelector('.iconLixo');

    lixo.addEventListener('click', () => {
        const marc1 = JSON.parse(localStorage.getItem('reservas'));
        const marc = marc1.filter(post => !(post.id === nr.id && post.user === username[0].user))
        localStorage.setItem('reservas', JSON.stringify(marc));
        nr.innerHTML= '';

    })
})






