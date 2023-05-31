const tudo = document.getElementById('carrinhoLista');
const marcacoes = JSON.parse(localStorage.getItem('carrinho'));
const username = JSON.parse(localStorage.getItem('utilizadorLigado'));
const marcacoesFiltro = marcacoes.find(post => post.email == username.email);
function carrinho() {
    if (marcacoesFiltro.atividades.length !== 0) {
        marcacoesFiltro.atividades.forEach(element => {
            const atv = JSON.parse(localStorage.getItem('atividades'));
            const atv1 = atv.find(post => post.id == element.id)
            const codigo = `
        <div class="atv" id="${atv1.id}">
            <div class="row nrPtc" ">
                <div class="col">
                    <h4 class="pb-10" id="nome">${atv1.titulo}</h4>
                    <img src="${atv1.imagemc}" id="imagem-carrinho">
                </div>
                <div class="col-5 meio">
                    <div class="campos d-flex">
                        <i class="fa-solid fa-calendar icones"></i>
                        <div class="campo">
                            <input type="date" id="data" class="campo1" placeholder="data">
                        </div>
                    </div>
                    <div class="campos d-flex">
                        <i class="fa-solid fa-clock icones"></i>
                        <div class="campo ">
                            <div class="dropdown ">
                                <button class="dropdown-toggle drop" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Hora
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="campos d-flex">
                        <i class="fa-solid fa-person icones"></i>
                        <p class="m-0" style="padding-top: 0.5%; padding-left: 1%;">Nº Pessoas</p>
                        <div class="campo d-flex" >
                            <button class="text-center text-white botaoAdd diminuir">-</button>
                            <input type="text" class="campo1 participantes" readonly>
                            <button class="text-center text-white botaoAdd adicionar">+</button>
                        </div>
                    </div>
                </div>
                <div class="col-2 pt-90">
                    <h5 id="preco">${(atv1.preco * atv1.requisitos.participantes).toFixed(2)}€</h5>
                </div>
                <div class="col-2 pt-80">
                    <span class="iconLixo"><i class="fa-solid fa-trash"></i></span>
                </div>
            </div>
            <hr class="linha">
        </div>`;
            tudo.innerHTML += codigo;

        });

        const nrParticipantes = document.querySelectorAll('.atv');

        nrParticipantes.forEach(nr => {
            const atv = JSON.parse(localStorage.getItem('atividades'));
            const atv1 = atv.find(post => post.id == nr.id);
            let campo = nr.querySelector('.participantes');
            let nrPart = atv1.requisitos.participantes;
            campo.value = nrPart;

            let preco = nr.querySelector('#preco');
            let total = document.getElementById('precoTotal');
            total.textContent = parseFloat(total.textContent) + (atv1.preco * atv1.requisitos.participantes);

            const horario = marcacoes.find(post => post.email === username.email).atividades.find(post => post.id === nr.id);
            if (horario.data.data.length !== 0) {
                const data = nr.querySelector('#data');
                data.value = horario.data.data;
            }

            if (horario.data.hora.length !== 0) {
                const hora1 = nr.querySelector('.drop');
                hora1.textContent = horario.data.hora;
                const dropItem = nr.querySelector('.dropdown-menu');
                dropItem.innerHTML = '';
                const horas = Math.round(atv1.requisitos.tempo / 60);
                for (let i = 8; i <= (20 - horas); i++) {
                    const horarioInicial = i;
                    const horarioFinal = i + horas;
                    const cod = `<a class="dropdown-item">${horarioInicial}h - ${horarioFinal}h</a>`;
                    dropItem.innerHTML += cod;
                }
                const dropItem1 = nr.querySelectorAll('.dropdown-item');
                const drop = nr.querySelector('.drop');

                dropItem1.forEach(obj => {
                    obj.addEventListener('click', () => {
                        drop.textContent = obj.textContent;
                    });
                });
            }

            const adicionar = nr.querySelector('.adicionar');
            adicionar.addEventListener('click', () => {
                let total1 = document.getElementById('precoTotal');
                let p = campo.value;
                p++;
                campo.value = p;
                let preco1 = atv1.preco * p;
                preco.textContent = preco1.toFixed(2) + '€';
                let total2 = parseFloat(total.textContent) + parseFloat(atv1.preco);
                total1.innerHTML = total2.toFixed(2);
            });

            const diminuir = nr.querySelector('.diminuir');
            diminuir.addEventListener('click', () => {
                let total1 = document.getElementById('precoTotal');
                let p = campo.value;
                if (p > nrPart) {
                    p--;
                    campo.value = p;
                    let preco1 = atv1.preco * p;
                    preco.textContent = preco1.toFixed(2) + '€';
                    let total2 = parseFloat(total.textContent) - parseFloat(atv1.preco);
                    total1.innerHTML = total2.toFixed(2);
                }

            });

            const lixo = nr.querySelector('.iconLixo');

            lixo.addEventListener('click', () => {
                const marc1 = JSON.parse(localStorage.getItem('carrinho'));
                const usuarioIndex = marc1.findIndex(item => item.email === username.email);

                if (usuarioIndex !== -1) {
                    const usuario = marc1[usuarioIndex];
                    usuario.atividades = usuario.atividades.filter(atividade => atividade.id !== nr.id);
                    localStorage.setItem("carrinho", JSON.stringify(marc1));
                    nr.remove();
                }
            })

            const data = nr.querySelector('#data');

            data.addEventListener('change', () => {
                const dropItem = nr.querySelector('.dropdown-menu');
                const horas = Math.round(atv1.requisitos.tempo / 60);
                dropItem.innerHTML = '';
                for (let i = 8; i <= (20 - horas); i++) {
                    const horarioInicial = i;
                    const horarioFinal = i + horas;
                    const cod = `<a class="dropdown-item">${horarioInicial}h - ${horarioFinal}h</a>`;
                    dropItem.innerHTML += cod;
                }

                const dropItem1 = nr.querySelectorAll('.dropdown-item');
                const drop = nr.querySelector('.drop');

                dropItem1.forEach(obj => {
                    obj.addEventListener('click', () => {
                        drop.textContent = obj.textContent;
                    });
                });
            });
        });
    } else {
        const met = document.getElementById('mets')
        const codigo = `
            <div class="text-center fullscreen d-flex justify-content-center align-items-center">
                <h2>Ainda não adicionaste nenhuma atividade ao teu carrinho</h2>
            </div>`;
        met.innerHTML = codigo;
    }
}

carrinho();

const seguinte = document.getElementById('btnSeguinte');
seguinte.addEventListener('click', () => {
    let verificacao = 1;

    let reservas = JSON.parse(localStorage.getItem('reservas'));
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const carrinho2 = carrinho.find(post => post.email === username.email);
    const atvs = document.querySelectorAll('.atv');
    atvs.forEach(atv => {
        const data = atv.querySelector('#data');
        const time = atv.querySelector('.drop');
        const partic = atv.querySelector('.participantes');
        if (data.value.length > 0 && time.textContent.length !== 74) {
            data.style.border = 'none';
            time.style.border = 'none';
            carrinho2.atividades.find(post => post.id === atv.id).data.data = data.value;
            carrinho2.atividades.find(post => post.id === atv.id).data.hora = time.textContent;
            carrinho2.atividades.find(post => post.id === atv.id).participantes = partic.value;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
        } else {
            verificacao = 0;
            if (data.value.length <= 0)
                data.style.border = '2px solid red';
            if (time.textContent.length === 74)
                time.style.border = '2px solid red';
        }
    });

    if (verificacao === 1) {
        const precoTotal = document.getElementById('precoTotal');
        const dataAtual = new Date();
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();
        const dataFormatada = `${dia}/${mes}/${ano}`;
        const reserva = {
            id: (username.email.split('@')[0] + Date.now()),
            email: username.email,
            atividades: carrinho2.atividades,
            total: precoTotal.textContent,
            data: dataFormatada,
            estado: 'Pendente',
            gestor: ''
        }

        if (reservas) {
            reservas.push(reserva);
            localStorage.setItem('reservas', JSON.stringify(reservas));
        } else {
            localStorage.setItem('reservas', JSON.stringify([reserva]));
        }

        const cima = document.getElementById('seccoes1');
        cima.innerHTML = `
            <div class="col-sm text-center">
                <h1 >Atividades</h1>
            </div>
            <div class="col-sm text-center selecionada">
                <h1 class="text-white">Pagamento</h1>
            </div>`;

        const corp = document.getElementById('mets');
        corp.classList.add('fullscreen');
        corp.innerHTML = `
            <div class="mt-100 row" style="width: 100%;">
                <div class="col text-center" id="mbway">
                    <img class="metodos1" src="images/mbway.png">
                </div>
                <div class="col text-center" id="mbanco">
                    <img class="metodos" src="images/multibanco.jpg">
                </div>
            </div>
            <div class="text-center" id="pagamento"></div>
            <div class="botaoSeguinte">
                <button class="btn btn-primary" id="btnFinal">Seguinte</button>
            </div>`;

        const mbway = document.getElementById('mbway');

        mbway.addEventListener('click', () => {
            const pagamento = document.getElementById('pagamento');
            pagamento.innerHTML = `<p>Foi enviado um pedido para o seu MBWay.</p>`
        });

        const mbanco = document.getElementById('mbanco');
        mbanco.addEventListener('click', () => {
            const pagamento = document.getElementById('pagamento');
            pagamento.innerHTML = `
                <h4>Entidade: 12345</h4>
                <h4>Referência: 111 222 333</h4>
                <h4>Valor: ${precoTotal.textContent}€</h4>`
        });


        const scrollToOptions = {
            top: 0,
            behavior: 'smooth' // Opção para uma rolagem suave
        };

        window.scrollTo(scrollToOptions);

        const btnFinal = document.getElementById('btnFinal');
        const corpoTudo = document.getElementById('tudo');
        btnFinal.addEventListener('click', () => {
            corpoTudo.innerHTML = `<h1 class="text-center pt-100"><i class="fa-sharp fa-solid fa-circle-check certo"></i><br>Obrigado pela sua compra!</h1>
            <p class="text-center m-0 pb-100"><a  href="index.html">Voltar ao início</a></p>`;
            const car = JSON.parse(localStorage.getItem('carrinho'));
            const car1 = car.filter(post => !(post.email === username.email));
            localStorage.setItem('carrinho', JSON.stringify(car1));
        });


    } else {
        alert('Tem que preencher todos os campos com datas!');
    }
});