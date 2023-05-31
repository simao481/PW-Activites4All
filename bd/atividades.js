const postContainer = document.querySelector("#atividades");
const paginationContainer = document.querySelector(".pagination-container");
const dropdownButton = document.querySelector(".dropdown-toggle");
const POSTS_PER_PAGE = 12;
let currentPage = 1;

/*fetch('/bd/atividades.json')
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('atividades', JSON.stringify(data));
        console.log('Atividades armazenados no LocalStorage');
    })
    .catch(error => {
        console.error('Erro ao buscar o JSON:', error);
    });

fetch('/bd/destaques.json')
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('destaques', JSON.stringify(data));
        console.log('Destaques armazenados no LocalStorage');
    })
    .catch(error => {
        console.error('Erro ao buscar o JSON:', error);
    });
*/

const createCardElement = (postData) => {
    const postElement = document.createElement("div");
    postElement.classList.add("card1");
    postElement.innerHTML = `
    <div class="card card1 atividades-card justify-content-end" id ="${postData.id}"
            style="background: url(${postData.imagem}); background-size: cover;">
            <div class="card-corpo">
                <h3 class="text-white texto-card-titulo" style="font-size: 150%;">${postData.titulo}</h3>
                <p class="text-white texto-card-corpo" style="font-size: 110%;">
                    <i class="icon" id="${postData.categoria}" style='color: white'></i> ${postData.categoria} <i class="fa fa-clock-o" aria-hidden="true"></i> ${postData.tempo}
                </p>
                <div class="row">
                    <div class="col-md-6 pt-10" style="padding-right:0%;">
                        <p class="text-white texto-card-corpo" style="font-size: 95%;"><span class="preco">${postData.preco}</span>€ / Pessoa</p>
                    </div>
                    <div class="col-md-5 mb-10 mr-10">
                        <button type="button" class="btn btn-primary comprar" id="${postData.id}">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    return postElement;
};

const nrReservas = () => {
    const reservas = JSON.parse(localStorage.getItem('carrinho'));
    const carrinho1 = document.getElementById('carrinho1');
    const user = JSON.parse(localStorage.getItem('utilizadorLigado'));
    if (user) {
        carrinho1.innerHTML = `<div id="carrinho">
        <div id="contador">
            
        </div>
        <p class="text-center pt-1" ><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
            </svg></p>`;
        const contador = document.getElementById('contador');
        if (reservas) {
            const reservasFiltered = reservas.find(post => post.email === user.email);
            if (reservasFiltered) {
                if (reservasFiltered.atividades.length !== 0)
                    contador.innerHTML = `<p class="text-center m-0 badge badge-pill badge-danger">${reservasFiltered.atividades.length}</p>`;
            } else {
                reservas.push({ email: user.email, atividades: [] });
                localStorage.setItem('carrinho', JSON.stringify(reservas));
            }

        } else {
            localStorage.setItem('carrinho', JSON.stringify([{ email: user.email, atividades: [] }]));
        }
        carrinho1.addEventListener('click', () => {
            window.location.href = 'carrinho.html';
        })
    }
}

nrReservas();

const addCardClickListener = () => {
    const classCard = document.querySelectorAll('.card');
    classCard.forEach((card) => {
        card.addEventListener('click', () => {
            const cardID = card.id;
            if (cardID) {
                localStorage.setItem('atividadeSelecionada', JSON.stringify(cardID));
                window.location.href = `AtividadeInfo.html`;
            }
        });

        const cardCorpo = card.querySelector('.comprar');
        cardCorpo.addEventListener('click', (event) => {
            event.stopPropagation();
            const userLogado = JSON.parse(localStorage.getItem('utilizadorLigado'));
            if (userLogado) {
                const reserva = { "id": cardCorpo.id, participantes: "", "data": { "data": "", "hora": "" } }
                const reservas = JSON.parse(localStorage.getItem('carrinho'));
                if (reservas) {
                    const reservasFiltered = reservas.find(post => post.email === userLogado.email);
                    const reservaFind = reservasFiltered.atividades.find(post => post.id === reserva.id);
                    if (reservaFind) {
                        alert('Esta atividade já está no seu carrinho!');
                    } else {
                        reservas.find(item => item.email === userLogado.email).atividades.push(reserva);
                        localStorage.setItem('carrinho', JSON.stringify(reservas));
                        nrReservas();
                    }
                } else {
                    localStorage.setItem('carrinho', JSON.stringify([{ email: userLogado.email, atividades: [reserva] }]));
                    nrReservas();
                }

            } else {
                window.location.href = 'login.html';
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



const renderPosts = (cardData, page) => {
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    const posts = cardData.slice(start, end);
    postContainer.innerHTML = "";
    posts.forEach((postData) => {
        const postElement = createCardElement(postData);
        postContainer.appendChild(postElement);
    });
    addCardClickListener();
};

const renderPagination = (cardData, page) => {
    const pageCount = Math.ceil(cardData.length / POSTS_PER_PAGE);
    let pages = "";
    let prevDisabled = "";
    let nextDisabled = "";

    if (page === 1) {
        prevDisabled = "disabled";
    }

    if (page === pageCount) {
        nextDisabled = "disabled";
    }

    pages += `
    <li class="page-item ${prevDisabled}">
      <button class="page-link" data-page="${page - 1}"><</button>
    </li>
  `;

    for (let i = 1; i <= pageCount; i++) {
        pages += `
      <li class="page-item${i === page ? " active" : ""}">
        <button class="page-link" data-page="${i}">${i}</button>
      </li>
    `;
    }

    pages += `
    <li class="page-item ${nextDisabled}">
      <button class="page-link" data-page="${page + 1}">></button>
    </li>
  `;

    paginationContainer.innerHTML = `
    <nav>
      <ul class="pagination">
        ${pages}
      </ul>
    </nav>
  `;

    const pageButtons = document.querySelectorAll(".pagination button");
    pageButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const newPage = parseInt(button.dataset.page);
            if (!isNaN(newPage)) {
                currentPage = newPage;
                renderPosts(cardData, currentPage);
                renderPagination(cardData, currentPage);
                window.scrollTo({ top: document.getElementById("atividades-section").offsetTop, behavior: "smooth" });
            }
        });
    });
};

const postMethodsFilter = (categoria) => {
    if (categoria === "Todos") {
        postMethods();
    } else {
        const atividades = JSON.parse(localStorage.getItem('atividades'));
        if (atividades) {
            const filteredData = atividades.filter(post => post.categoria === categoria);
            renderPosts(filteredData, 1);
            renderPagination(filteredData, 1);
        }
    }
};

const postMethods = () => {
    const atividades = JSON.parse(localStorage.getItem('atividades'));
    if (atividades) {
        renderPosts(atividades, 1);
        renderPagination(atividades, 1);

        const dropdownItems = document.querySelectorAll(".dropdown-item");

        dropdownItems.forEach((item) => {
            item.addEventListener("click", () => {
                dropdownButton.textContent = item.textContent;
                postMethodsFilter(item.textContent);
            });
        });
    }
};

//---------------------------------------------------Destaques--------------------------------------------------

const postContainer2 = document.querySelector("#destaques");

function createCardElement2(filteredData) {
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
                    <p class="text-white texto-card-corpo" style="font-size: 95%;">Desde<br><span class="preco">${filteredData[0].preco}</span>€ / Pessoa</p>
                </div>
                <div class="col-sm">
                    <button type="button" class="btn btn-primary comprar" id="${filteredData[0].id}">Comprar</button>
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

//carrinho
window.addEventListener('scroll', function () {
    const user = JSON.parse(this.localStorage.getItem('utilizadorLigado'));
    var elementoFixo = document.getElementById('carrinho');
    var conteudo = document.getElementById('corpoTodo');
    if (user) {
        var limiteSuperior = conteudo.offsetTop;
        var limiteInferior = limiteSuperior + conteudo.offsetHeight;

        if (window.pageYOffset >= limiteSuperior && window.pageYOffset <= limiteInferior) {
            elementoFixo.style.top = '50px'; // Altura desejada quando o elemento está fixo
        } else {
            elementoFixo.style.top = ''; // Remove a propriedade 'top' para que o elemento fique posicionado de acordo com o CSS
        }
    }
});