const postContainer = document.querySelector(".card-container");

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

const postMethods = async () => {
  const cardData = await getCardData();
  if (cardData) {
    cardData.forEach((postData) => {
      const postElement = createCardElement(postData);
      postContainer.appendChild(postElement);
    });
  }
};

postMethods();
