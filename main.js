var player1 = {
    nome: 'player1',
    wins: 0,
    defeats: 0,
    currentPoints: 0
}

var player2 = {
    nome: 'player2',
    wins: 0,
    defeats: 0,
    currentPoints: 0
}

var opcao;
var selecionados = [];
var carta_1;
var carta_2;
var carta_3;
var quem_joga = 1;
var vencedor_atual;
var cont1;
var cont2;

var ia = false;

var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function criaTelas(nome) {
    var area = document.getElementById('interacoes');
    area.innerHTML = '';
    // var criar = Telas();
    switch (nome) {
        case "principal":
            telas.principal(area)
            break;
        case "selecionar":
            telas.selecionar(area)
            break;
        case "ranking":
            telas.ranking(area)
            break;
        case "regras":
            telas.regras(area)
            break;
        case "modo-solo":
            telas.modoSolo(area)
            break;
        case "resultado":
            telas.resultado(area)
            break;
        default:
            area.innerHTML = '<h2>Tela não encontrada</h2>';
            break;
    }
}


var telas = {
    principal: function (area) {

        var screen = document.createElement('div')
        screen.setAttribute('id', 'screen-principal')
        area.appendChild(screen)

        // Criação de botão INICIAR
        var btnIniciar = document.createElement('button'); //CRIANDO O ELEMENTO
        btnIniciar.appendChild(document.createTextNode('INICIAR')); // ADICIONANDO TEXTO NO BOTÃO
        btnIniciar.setAttribute('class', 'button'); // ADICIONANDO ATRIBUTO CLASS
        btnIniciar.addEventListener('click', () => criaTelas('selecionar'))
        // Criação de botão Regras
        var btnRegras = document.createElement('button'); //CRIANDO O ELEMENTO
        btnRegras.appendChild(document.createTextNode('REGRAS')); // ADICIONANDO TEXTO NO BOTÃO
        btnRegras.addEventListener('click', () => criaTelas('regras'))
        btnRegras.setAttribute('class', 'button'); // ADICIONANDO ATRIBUTO CLASS

        // Criação de botão Ranking
        var btnRanking = document.createElement('button'); //CRIANDO O ELEMENTO
        btnRanking.appendChild(document.createTextNode('RANKING')); // ADICIONANDO TEXTO NO BOTÃO
        btnRanking.addEventListener('click', () => criaTelas('ranking'))
        btnRanking.setAttribute('class', 'button'); // ADICIONANDO ATRIBUTO CLASS


        var elementos = [
            btnIniciar,
            btnRegras,
            btnRanking
        ];

        elementos.map(function (value) {
            screen.appendChild(value)
        })
        // ADICIONANDO BOTÃO NA AREA DE INTERAÇÃO
    },

    selecionar: function (area) {

        var screen = document.createElement('div')
        screen.setAttribute('id', 'screen-selecionar')
        area.appendChild(screen)

        // MODO SOLO
        var btnSingle = document.createElement('button'); //CRIANDO O ELEMENTO
        btnSingle.appendChild(document.createTextNode('1 JOGADOR')); // ADICIONANDO TEXTONO BOTÃO
        btnSingle.setAttribute('class', 'button'); // ADICIONANDO ATRIBUTO CLASS
        btnSingle.addEventListener('click', function () {
            ia = true;
            criaTelas('modo-solo');
        })

        // MODO MULTIPLAYER
        var btnMultiple = document.createElement('button'); //CRIANDO O ELEMENTO
        btnMultiple.appendChild(document.createTextNode('2 JOGADORES')); // ADICIONANDO TEXTONO BOTÃO
        btnMultiple.setAttribute('class', 'button'); // ADICIONANDO ATRIBUTO CLASS
        btnMultiple.addEventListener('click', function () {
            ia = false;
            criaTelas('modo-solo')
        })

        var elementos = [
            btnSingle,
            btnMultiple,
        ];

        elementos.map(function (value) {
            screen.appendChild(value)
        })
    },
    modoSolo: function (area) {
        var contadores = document.createElement('div')
        contadores.setAttribute('id', 'contadores-game')
        area.appendChild(contadores)

        cont1 = document.createElement('div');
        cont1.classList.add('contador');
        cont1.classList.add('bg-red');
        cont1.innerText = 'Player 1 - 0';

        cont2 = document.createElement('div');
        cont2.classList.add('contador');

        cont2.innerText = '0 - ' + (ia ? 'Computador' : 'Player 2');

        contadores.appendChild(cont1)
        contadores.appendChild(cont2)


        var screen = document.createElement('div')
        screen.setAttribute('id', 'screen-game')
        area.appendChild(screen)

        carta_1 = document.createElement('div')
        carta_1.setAttribute('class', 'cartas')
        carta_1.addEventListener('click', () => jogada(carta_1))

        carta_2 = document.createElement('div')
        carta_2.setAttribute('class', 'cartas')
        carta_2.addEventListener('click', () => jogada(carta_2))

        carta_3 = document.createElement('div')
        carta_3.setAttribute('class', 'cartas')
        carta_3.addEventListener('click', () => jogada(carta_3))

        configuraCartas()


        var elementos = [
            carta_1,
            carta_2,
            carta_3
        ];

        elementos.map(function (value, index) {
            screen.appendChild(value)
        })
    },
    resultado: function (area) {
        var screen = document.createElement('div')
        screen.setAttribute('id', 'screen-vencedor')
        area.appendChild(screen)
        var title = document.createElement('h2');
        title.classList.add('subTitle');
        title.innerText = "VENCEDOR";

        var vencedor = document.createElement('h3');
        vencedor.classList.add('vencedor');
        vencedor.innerText = ia && vencedor_atual == 2 ? 'Computador' : 'Player ' + vencedor_atual;

        var elementos = [title, vencedor];
        elementos.map(function (value, index) {
            screen.appendChild(value)
        })

        setTimeout(function () {
            criaTelas("modo-solo")
        }, 2000)
    },
    ranking: function (area) {
        var screen = document.createElement('div')
        screen.setAttribute('id', 'screen-ranking')
        area.appendChild(screen)

        var title = document.createElement('h2');
        title.classList.add('subTitle');
        title.innerText = "RANKING";

        let players = [player1, player2];
        players.sort(function (a, b) {
            return a.wins < b.wins;
        })
        console.log(players);
        let table = document.createElement('table');
        table.classList.add('table')
        let linha_titulo = document.createElement('tr')
        let col_pos = document.createElement('th');
        col_pos.innerText = '#';
        let col_nome = document.createElement('th')
        col_nome.innerText = 'Player';
        let col_pontos = document.createElement('th')
        col_pontos.innerText = 'Vitórias';
        let col_derrotas = document.createElement('th')
        col_derrotas.innerText = 'Derrotas';

        // INSERINDO COLUNAS NA LINHA 1
        linha_titulo.appendChild(col_pos);
        linha_titulo.appendChild(col_nome);
        linha_titulo.appendChild(col_pontos);
        linha_titulo.appendChild(col_derrotas);
        table.appendChild(linha_titulo);

        // CRIANDO LINHAS DINAMICAMENTE E ADICIONANDO A TABELA
        players.map(function (value, index) {
            let linha_conteudo = document.createElement('tr')
            let val_pos = document.createElement('td');
            val_pos.innerText = index + 1;

            let val_nome = document.createElement('td')
            val_nome.innerText = value.nome;

            let val_wins = document.createElement('td')
            val_wins.innerText = value.wins;

            let val_defeats = document.createElement('td')
            val_defeats.innerText = value.defeats;

            linha_conteudo.appendChild(val_pos);
            linha_conteudo.appendChild(val_nome);
            linha_conteudo.appendChild(val_wins);
            linha_conteudo.appendChild(val_defeats);
            table.appendChild(linha_conteudo);
        })



        var elementos = [
            title,
            table
        ];

        elementos.map(function (value, index) {
            screen.appendChild(value)
        })

    },
    regras: function name(area) {


        var screen = document.createElement('div')
        screen.setAttribute('id', 'screen-regras')
        area.appendChild(screen)

        var title = document.createElement('h2');
        title.classList.add('subTitle');
        title.innerText = "REGRAS";
        var conteudo = document.createElement('div');
        conteudo.classList.add('content')
        conteudo.innerHTML = "\
        a) Cada jogador só pode escolher os três números a partir do ultimo escolhido.<br><br>\
            b) Quem chegar em 21 primeiro vence a partida.<br><br>\
                c) Se escolher um numero maior que 21 o jogador perderá a partida.<br><br>\
                    d) Os números iniciais serão sempre 1, 2 ou 3.";

        var elementos = [
            title,
            conteudo
        ];


        elementos.map(function (value, index) {
            screen.appendChild(value)
        })




    }

}

function opcoes(numero) {
    if (numero) {
        return numeros.slice(numero, numero + 3);
    }
    return numeros.slice(0, 3);
}

function jogada(carta) {

    let numero = parseInt(carta.getAttribute('value')); //SALVA VALOR DA VARIÁVEL

    carta.setAttribute('value', ''); // ZERA O VALOR DA CARTA APÓS SELECIONADA

    if (numero) {

        if (quem_joga == 1) {
            player1.currentPoints += numero;
            cont1.innerText = 'Player 1 - ' + player1.currentPoints;
            quem_joga = 2;
            cont2.classList.add('bg-red');
            cont1.classList.remove('bg-red');
        } else {
            player2.currentPoints += numero;
            cont2.innerText = player2.currentPoints + ' - ' + (ia ? 'Computador' : 'Player 2');
            cont1.classList.add('bg-red');
            cont2.classList.remove('bg-red');
            quem_joga = 1;
        }

        if (!verificaVencedor()) {
            if (ia && quem_joga == 2) {
                carta_1.style.pointerEvents = 'none';
                carta_2.style.pointerEvents = 'none';
                carta_3.style.pointerEvents = 'none';
            } else {
                carta_1.style.pointerEvents = 'auto';
                carta_2.style.pointerEvents = 'auto';
                carta_3.style.pointerEvents = 'auto';

            }
            configuraCartas(numero);// Reseta do valor das cartas
            if (ia && quem_joga == 2) {
                jogadaBot()
            }
        }
    }
}

function configuraCartas(numero) {
    carta_1.setAttribute('value', opcoes(numero)[0]);
    carta_1.innerHTML = carta_1.getAttribute('value');
    carta_2.setAttribute('value', opcoes(numero)[1]);
    carta_2.innerHTML = carta_2.getAttribute('value');
    carta_3.setAttribute('value', opcoes(numero)[2]);
    carta_3.innerHTML = carta_3.getAttribute('value');
}

function verificaVencedor() {
    if (player2.currentPoints > 21 || player1.currentPoints == 21) {
        player1.wins += 1;
        player2.defeats += 1;
        vencedor_atual = 1;
        criaTelas('resultado');
        reiniciaJogo();
        return true
    }

    if (player1.currentPoints > 21 || player2.currentPoints == 21) {
        player2.wins += 1;
        player1.defeats += 1;
        vencedor_atual = 2;
        criaTelas('resultado');
        reiniciaJogo()
        return true;
    }

    return false;
}

function jogadaBot() {
    let escolha = Math.floor(Math.random() * (Math.floor(3) - Math.ceil(1) + 1)) + Math.ceil(1);
    console.log(escolha);
    setTimeout(function () {
        eval('carta_' + (escolha)).classList.add('selected')
        setTimeout(function () {
            eval('carta_' + (escolha)).classList.remove('selected')
            jogada(eval('carta_' + (escolha)));
        }, 1000)
    }, 1000)
}

function reiniciaJogo() {
    player1.currentPoints = 0;
    player2.currentPoints = 0;

    quem_joga = 1;
    configuraCartas();
}

window.addEventListener("load", function (event) {
    criaTelas('principal')
});