const navEntrar = document.getElementById('nav-entrar');
const logado = JSON.parse(localStorage.getItem('utilizadorLigado'));
    if(logado){
        navEntrar.innerHTML = `<i class="fa-solid fa-circle-user"></i> ${logado[0].user}`
        navEntrar.addEventListener('click', () =>{
            console.log('deu');
        })
        
    }else{
        navEntrar.addEventListener('click', () =>{
            window.location.href = 'login.html';
        })
    }