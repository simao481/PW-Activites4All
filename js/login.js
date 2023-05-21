const botao = document.getElementById('btn-entrar');
const username = document.getElementById('username');
const password = document.getElementById('password');
const erro = document.getElementById('erro');

const users = JSON.parse(localStorage.getItem('utilizadores'));

botao.addEventListener('click', () =>{
    const user = users.filter(nome => nome.user === username.value);
    if(user.length !== 0 && user[0].password === password.value){
        localStorage.setItem("utilizadorLigado", JSON.stringify(user));
        erro.innerHTML= '';
        window.history.back();
    }else{
        erro.innerHTML = `<p>Username ou password incorretos!</p>`
    }
})