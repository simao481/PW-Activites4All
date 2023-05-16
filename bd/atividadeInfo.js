const titulo = document.getElementById("tituloPag");
const nome = document.getElementById("nomeAtividade");
const id = localStorage.getItem('atividadeSelecionada');

const atividades = JSON.parse(localStorage.getItem('atividades'));
if (id) {
    const atividade = atividades.filter(post => post.id === JSON.parse(id));
    console.log(atividade);
    atividade.forEach((postData) => {
    titulo.innerHTML = postData.titulo;
    nome.innerHTML = postData.titulo;
    });   
}else{
    
}
