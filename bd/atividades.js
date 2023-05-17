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


let dados1 = {
    "id": "26",
    "titulo": "Nado Livre4",
    "preco": "12.99",
    "imagem": "agua",
    "tempo": "2h",
    "categoria": "Terra",
    "icon": "fas fa-water",
    "descricao": "Uma descrição qualquer!!!",
    "materialNecessario":["Calçado confortável", "Roupa confortável", "Boa vontade![Obrigatório]"],
    "materialIncluido":["Capacete", "Luvas", "Corda", "Arnês"],
    "dificuldade": "3",
    "localizacao": "1",
    "pacotes":[{"nomePacote": "Ganda Pacote",
                "preco": "15.99"},
                {"nomePacote": "Ganda Pacote",
                "preco": "15.99"},
                {"nomePacote": "Ganda Pacote",
                "preco": "15.99"},
                {"nomePacote": "Ganda Pacote",
                "preco": "15.99"},
                {"nomePacote": "Ganda Pacote",
                "preco": "15.99"}]
}

const lista = JSON.parse(localStorage.getItem('atividades')) || [];
lista.push(dados1);
localStorage.setItem('atividades', JSON.stringify(lista));
console.log(lista);

const createCardElement = (postData) => {
    const postElement = document.createElement("div");
    postElement.classList.add("card1");
    postElement.innerHTML = `
    <div class="card card1 atividades-card justify-content-end" id ="${postData.id}"
            style="background: url(images/${postData.imagem}.jpeg); background-size: cover;">
            <div class="card-corpo">
                <h3 class="text-white texto-card-titulo" style="font-size: 150%;">${postData.titulo}</h3>
                <p class="text-white texto-card-corpo" style="font-size: 110%;">
                    <i class='${postData.icon}' style='color: white'></i> ${postData.categoria} <i class="fa fa-clock-o" aria-hidden="true"></i> ${postData.tempo}
                </p>
                <div class="row">
                    <div class="col-sm" style="padding-right:0%;">
                        <p class="text-white texto-card-corpo" style="font-size: 95%;">Desde<br><span class="preco">${postData.preco}</span>€ / Pessoa</p>
                    </div>
                    <div class="col-sm">
                        <button type="button" class="btn btn-primary comprar">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    return postElement;
};

const addCardClickListener = () => {
    const classCard = document.querySelectorAll('.card1');

    classCard.forEach((card) => {
        card.addEventListener('click', () => {
            const cardID = card.id;
            if(cardID){
                localStorage.setItem('atividadeSelecionada', JSON.stringify(cardID));
                window.location.href = `AtividadeInfo.html`;
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
            console.log(atividades);
            const filteredData = atividades.filter(post => post.categoria === categoria);
            renderPosts(filteredData, 1);
            renderPagination(filteredData, 1);
        }
    }
};

const postMethods = () => {
    const atividades = JSON.parse(localStorage.getItem('atividades'));
    if (atividades) {
        console.log(atividades);
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


//--------------------------Dropbox Filtro--------------------



//---------------------------------------------------Destaques--------------------------------------------------

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

