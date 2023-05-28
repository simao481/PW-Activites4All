const reservas = JSON.parse(localStorage.getItem('reservas'));
const user = JSON.parse(localStorage.getItem('utilizadorLigado'));
const tabela = document.getElementById('tabelaReservas');
const reservasUser = reservas.filter(post => post.user === user[0].user);

function getStatusLabel(estado) {
  if (estado === 'Pendente') {
    return `
      <span class="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
        Pendente
      </span>`;
  } else if (estado === 'Aceite') {
    return `
      <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
        Aceite
      </span>`;
  } else if (estado === 'Recusado') {
    return `
      <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
        Recusado
      </span>`;
  }
}

function renderTable() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const tableBody = document.getElementById('tabelaReservas');
  tableBody.innerHTML = '';

  for (let i = startIndex; i < endIndex && i < reservasUser.length; i++) {
    const element = reservasUser[i];
    const row = `
      <tr class="text-gray-700 linhaRes dark:text-gray-400 linhaReserva" id="${element.id}">
        <td class="px-4 py-3">
          <div class="flex items-center text-sm">
            <div>
              <p class="font-semibold">${element.id}</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">Braga</p>
            </div>
          </div>
        </td>
        <td class="px-4 py-3 text-sm text-center">${element.data}</td>
        <td class="px-4 py-3 text-sm text-center">${element.total}€</td>
        <td class="px-4 py-3 text-sm text-center">${element.atividades.length}</td>
        <td class="px-4 py-3 text-xs text-center" id="estado">
          ${getStatusLabel(element.estado)}
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  }
}

const linhas = document.querySelectorAll('.linhaReserva');

linhas.forEach(linha => {
  const reserva = reservasUser.find(post => post.id === linha.id);
  const status = linha.querySelector('#estado');
  if (reserva.estado === 'Pendente') {
    status.innerHTML = `
      <span class="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
        Pendente
      </span>`;
  } else if (reserva.estado === 'Aceite') {
    status.innerHTML = `
      <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
        Aceite
      </span>`;
  } else if (reserva.estado === 'Recusado') {
    status.innerHTML = `
      <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
        Recusado
      </span>`;
  }
});

let currentPage = 1;
const itemsPerPage = 5;

function goToPage(page) {
  currentPage = page;
  renderTable();
  setupPagination();
}

function setupPagination() {
  const totalPages = Math.ceil(reservasUser.length / itemsPerPage);
  const paginationContainer = document.querySelector('.pagination');

  paginationContainer.innerHTML = '';

  for (let page = 1; page <= totalPages; page++) {
    const paginationItem = document.createElement('li');
    const paginationLink = document.createElement('button');

    paginationLink.innerText = page;
    paginationLink.classList.add('px-3', 'py-1', 'rounded-md', 'focus:outline-none', 'focus:shadow-outline-green');
    if (page === currentPage) {
      paginationLink.classList.add('text-white', 'bg-green-6001', 'border', 'border-r-0', 'border-green-600', 'rounded-md',);
    } else {
      paginationLink.classList.add('text-gray-700');
    }

    paginationLink.addEventListener('click', () => {
      goToPage(page);
    });

    paginationItem.appendChild(paginationLink);
    paginationContainer.appendChild(paginationItem);
  }
}

renderTable();
setupPagination();

const linhasReservas = document.querySelectorAll('.linhaRes');

linhasReservas.forEach(linha =>{
    linha.addEventListener('click', () =>{
        localStorage.setItem('reservaSelecionada', linha.id);
        window.location.href = 'reservaInfo.html';
    });
});