// Botão na página 1
const button1 = document.querySelector(".botao-ar");

button1.addEventListener("click", function() {
  localStorage.setItem('categoriaSelecionada', 'Ar');
});

const button2 = document.querySelector(".botao-terra");

button2.addEventListener("click", function() {
  localStorage.setItem('categoriaSelecionada', 'Terra');
});

const button3 = document.querySelector(".botao-agua");

button3.addEventListener("click", function() {
  localStorage.setItem('categoriaSelecionada', 'Água');
});