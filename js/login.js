const botao = document.getElementById('btn-entrar');
const username = document.getElementById('username');
const password = document.getElementById('password');
const erro = document.getElementById('erro');

const users = JSON.parse(localStorage.getItem('utilizadores'));
const gestores = JSON.parse(localStorage.getItem('gestores'));

botao.addEventListener('click', () => {
    const user = users.find(nome => nome.email === username.value);
    const gestor = gestores.find(nome => nome.user === username.value);
    if (user && user.password === password.value) {
        user.role = "cliente";
        localStorage.setItem("utilizadorLigado", JSON.stringify(user));
        erro.innerHTML = '';
        window.location.href = 'index.html'
    } else if(gestor && gestor.password === password.value) {
        gestor.role = 'gestor';
        localStorage.setItem("utilizadorLigado", JSON.stringify(gestor));
        erro.innerHTML = '';
        window.location.href = 'index.html'
    }else{
        erro.innerHTML = `<p>Username ou password incorretos!</p>`
    }
})

function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential);
    const user = {
        role: 'cliente',
        email: data.email,
        password: '',
        nome: data.name
    }
    let users = JSON.parse(localStorage.getItem('utilizadores'));
    if (users) {
        const userFind = users.find(post => post.email === user.email);
        if (!userFind) {
            users.push(user);
            localStorage.setItem('utilizadores', JSON.stringify(users));
        }
    } else {
        localStorage.setItem('utilizadores', JSON.stringify([user]));
    }
    localStorage.setItem('utilizadorLigado', JSON.stringify(user));
    window.location.href = 'index.html';
}

window.onload = function () {

    google.accounts.id.initialize({
        client_id: "469107567117-fcd1tbc4qn4o3pb8h4ji4qi7k7k7q3t0.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("googlebtn"),
        { theme: "outline", size: "large" }  // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
}