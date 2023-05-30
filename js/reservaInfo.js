const reservas = JSON.parse(localStorage.getItem('reservas'));
const username = JSON.parse(localStorage.getItem('utilizadorLigado'));
const lista = document.getElementById('reservas');
const idRes = localStorage.getItem('reservaSelecionada');
const reservasFiltro = reservas.find(post => post.email == username.email && post.id === idRes);

function carrinho() {
    reservasFiltro.atividades.forEach(element => {
        const atv = JSON.parse(localStorage.getItem('atividades'));
        const atv1 = atv.find(post => post.id === element.id);
        console.log(atv1)
        const codigo = `
        <div class="atv" id="${atv1.id}">
          <div class="row w-100 nrPtc mb-20">
            <div class="col-4">
              <h2 class="text-center my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200" id="nome">
                ${atv1.titulo}
              </h2>
              <img src="images/${atv1.imagem}.jpeg" id="imagem-carrinho">
            </div>
            <div class="col-5 meio mt-100">
              <div class="campos d-flex">
                <i class="fa-solid fa-calendar icones"></i>
                <div class="campo ml-5">
                  <p>${element.data.data.split('-')[2]}/${element.data.data.split('-')[1]}/${element.data.data.split('-')[0]}</p>
                </div>
              </div>
              <div class="campos d-flex">
                <i class="fa-solid fa-clock icones"></i>
                <div class="campo ">
                  <p style="padding-top: 1%;">${element.data.hora}</p>
                </div>
              </div>
              <div class="campos d-flex">
                <i class="fa-solid fa-person icones"></i>
                <p class="m-0" style="padding-top: 0.5%; padding-left: 1%;">Nº Pessoas:</p>
                <div class="campo d-flex" style="padding-top: 0.5%;">
                  <p>${element.participantes}</p>
                </div>
              </div>
            </div>
            <div class="col-2 pt-90 mt-100">
              <h5 id="preco">${atv1.preco * element.participantes}€</h5>
            </div>
          </div>
          <hr class="linha">
        </div>`;
        lista.innerHTML += codigo;

    });
    const nomeRes = document.getElementById('nomeRes');
    nomeRes.innerHTML = idRes;

    const data = document.getElementById('data');
    data.innerHTML = reservasFiltro.data;

    const estado = document.getElementById('estado');
    if(reservasFiltro.estado === 'Pendente'){
      estado.innerHTML = `<span class="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
      Pendente
    </span>`;
    }else if(reservasFiltro.estado === 'Aceite'){
      estado.innerHTML = `<span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
      Aceite
    </span>`;
    }else if(reservasFiltro.estado === 'Recusado'){
      estado.innerHTML = `<span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
      Recusado
    </span>`;
    }

    const total = document.getElementById('total');
    total.innerHTML = reservasFiltro.total;
}

carrinho();