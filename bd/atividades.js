const postContainer = document.querySelector(".card-container");
const paginationContainer = document.querySelector(".pagination-container");
const POSTS_PER_PAGE = 12;
let currentPage = 1;

const getCardData = async () => {
  try {
    const response = await fetch('/bd/atividades.json');
    const cardData = await response.json();
    return cardData;
  } catch (error) {
    console.error(error);
  }
};

const createCardElement = (postData) => {
  const postElement = document.createElement("div");
  postElement.classList.add("card");
  postElement.innerHTML = `
    <div class="card atividades-card justify-content-end"
            style="background: url(images/${postData.imagem}.jpeg); background-size: cover;">
            <div class="card-corpo">
                <h3 class="text-white texto-card-titulo">${postData.titulo}</h3>
                <p class="text-white texto-card-corpo">
                    <i class='${postData.icon}' style='color: white'></i> ${postData.categoria} <i class="fa fa-clock-o" aria-hidden="true"></i> ${postData.tempo}
                </p>
                <div class="row">
                    <div class="col-sm">
                        <p class="text-white texto-card-corpo">Desde<br><span class="preco">${postData.preco}</span>€ / Pessoa</p>
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

const renderPosts = (cardData, page) => {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const posts = cardData.slice(start, end);
  postContainer.innerHTML = "";
  posts.forEach((postData) => {
    const postElement = createCardElement(postData);
    postContainer.appendChild(postElement);
  });
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

const postMethods = async () => {
  const cardData = await getCardData();
  if (cardData) {
    renderPosts(cardData, currentPage);
    renderPagination(cardData, currentPage);
  }
};

postMethods();

//---------------------------------------------------Destaques--------------------------------------------------

const postContainer2 = document.querySelector(".card-container2");

const getCardData2 = async () => {
  try {
    const response = await fetch('/bd/destaques.json');
    const cardData2 = await response.json();
    return cardData2;
  } catch (error) {
    console.error(error);
  }
};

const createCardElement2 = (postData2) => {
  const postElement2 = document.createElement("div");
  postElement2.classList.add("card2");
  postElement2.innerHTML = `
    <div class="card2 atividades-card justify-content-end"
            style="background: url(images/${postData2.imagem}.jpeg); background-size: cover;">
            <div class="card-corpo">
                <h3 class="text-white texto-card-titulo">${postData2.titulo}</h3>
                <p class="text-white texto-card-corpo">
                    <i class='${postData2.icon}' style='color: white'></i> ${postData2.categoria} <i class="fa fa-clock-o" aria-hidden="true"></i> ${postData2.tempo}
                </p>
                <div class="row">
                    <div class="col-sm">
                        <p class="text-white texto-card-corpo">Desde<br><span class="preco">${postData2.preco}</span>€ / Pessoa</p>
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
  const cardData2 = await getCardData2();
  if (cardData2) {
    cardData2.forEach((postData2) => {
      const postElement2 = createCardElement(postData2);
      postContainer2.appendChild(postElement2);
    });
  }
};

postMethods2();

//--------------------------Dropbox Filtro--------------------

const dropdownButton = document.querySelector(".dropdown-toggle");
const dropdownItems = document.querySelectorAll(".dropdown-item");

dropdownItems.forEach((item) => {
  item.addEventListener("click", () => {
    dropdownButton.textContent = item.textContent;
  });
});

