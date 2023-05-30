const navEntrar = document.getElementById('loginCond');
const logado = JSON.parse(localStorage.getItem('utilizadorLigado'));
    if(logado){
        navEntrar.innerHTML = `
            <li class="dropdown">
                <a class="dropdown-toggle" href="#" data-toggle="dropdown">
                    <i class="fa-solid fa-circle-user"></i> ${logado.nome}
                </a>
                <div class="dropdown-menu menuPerfil">
                    <a class="dropdown-item ditem" href="reservas.html">Minha Área</a>
                    <a class="dropdown-item ditem" id="sair" href="#">Sair</a>
                </div>
            </li>`;
        const sair = document.getElementById('sair');
        sair.addEventListener('click', () =>{
            localStorage.removeItem('utilizadorLigado');
            location.reload();
        })  
    }else{
        navEntrar.addEventListener('click', () =>{
            window.location.href = 'login.html';
        })
    }
    