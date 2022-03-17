var Monte = ['A11flo', '2flo', '3flo', '4flo', '5flo', '6flo', '7flo', '8flo', '9flo', '10flo', 'Jflo', 'Qflo', 'Kflo',
    'A11cor', '2cor', '3cor', '4cor', '5cor', '6cor', '7cor', '8cor', '9cor', '10cor', 'Jcor', 'Qcor', 'Kcor',
    'A11esp', '2esp', '3esp', '4esp', '5esp', '6esp', '7esp', '8esp', '9esp', '10esp', 'Jesp', 'Qesp', 'Kesp',
    'A11dia', '2dia', '3dia', '4dia', '5dia', '6dia', '7dia', '8dia', '9dia', '10dia', 'Jdia', 'Qdia', 'Kdia']

var placarJ = 0
var placarC = 0
var cartasUsadas = 0
var aux = [1, 2, 3, 4]
console.log($('#cartasCRod'))
function iniciar() {
    MonteJ = Monte.sort(() => Math.random() - 0.5)//global
    console.log(MonteJ)
    if ($('#nome').val() == '') {
        alert('Coloque seu nome')
        EventTarget.preventDefault();
    }
    else {
        $('#nm_jogador')[0].innerHTML = ($('#nome').val())
    }
    $('#start').hide()
    $('#jogo').show()
    /*MonteJ = ['2flo', 'A11flo', '10flo', '10flo', '8dia', 'A11flo', '6flo', '7flo', '8dia', '10dia', '8flo',
        'Qcor', 'Kdia', '5cor', 'A11cor', '2dia', 'Jdia', '3flo', '9cor', 'A11flo', '10flo', '3cor', 'Kcor',
        '10cor', '6flo', '9flo', '10flo', '4cor', '2cor', '2flo', '3flo', '6dia', '8cor', 'Qdia', 'Qflo',
        'Qflo', 'Jcor', '6cor', '5dia', '9dia', '9flo', '4flo', '4dia', 'Jflo', '8flo', 'Kflo', '7cor',
        'Jflo', '5flo', '3dia', '2flo', '7dia']//para testes*/
    primeCartas()
}

function primeCartas() {//define as primeiras cartas
    $('#cartasJRod').empty()
    $('#cartasCRod').empty()
    $('#cartasJRod').append('<h4 id=J' + MonteJ[cartasUsadas].replace(/[a-z]/g, '') + '><img src="img/' + MonteJ[cartasUsadas] + '.png" alt=""></h4>')
    $('#cartasCRod').append('<h4 id=C' + MonteJ[cartasUsadas + 1].replace(/[a-z]/g, '') + '><img src="img/' + MonteJ[cartasUsadas + 1] + '.png" alt=""></h4>')
    $('#cartasJRod').append('<h4 id=J' + MonteJ[cartasUsadas + 2].replace(/[a-z]/g, '') + '><img src="img/' + MonteJ[cartasUsadas + 2] + '.png" alt=""></h4>')
    $('#cartasCRod').append('<h4 id=C' + MonteJ[cartasUsadas + 3].replace(/[a-z]/g, '') + '><img id="' + MonteJ[cartasUsadas + 3] + '" class="verso" src="img/versocarta.png" alt=""></h4>')
    for (let i = 0; i < aux.length; i++) {
        aux[i] = MonteJ[cartasUsadas + i].replace(/[a-z]/g, '')
        if (aux[i] == 'A11') {
            aux[i] = 11
        }
        if (aux[i] == 'J' || aux[i] == 'Q' || aux[i] == 'K') {
            aux[i] = 10
        }
        aux[i] = parseInt(aux[i])
    }
    placarJ = aux[0] + aux[2]
    placarC = aux[1]
    mudarA(placarJ, 'J')
    $('#placarJ')[0].innerHTML = placarJ
    $('#placarC')[0].innerHTML = placarC
    cartasUsadas += 4
    twentyOne(placarJ)
}
function twentyOne(cartas) {//conferir se fez ou ultrapassou 21
    if (cartas == 21) {
        fim('21')//bom
    }
    if (cartas > 21) {
        fim('22')//mal
    }
}
function mudarA(placar, jc) {//mudar valor de A
    if (placar > 21 && $('#' + jc + 'A11').length >= 1) {//mudar o A de 11 pra 1/ver se a mão for AA
        $('#' + jc + 'A11')[0].id = jc + 'A1'
        if (jc == 'J')
            placarJ -= 10
        else
            placarC -= 10
    }
}
function maisCarta() {//jogador compra uma carta
    $('#cartasJRod').append('<h4 id=J' + MonteJ[cartasUsadas].replace(/[a-z]/g, '') + '><img src="img/' + MonteJ[cartasUsadas] + '.png" alt=""></h4>')
    placarJ += parseInt(MonteJ[cartasUsadas].replace(/[a-z]/g, '').replace('A11', 11).replace(/[J-Q]/g, 10))
    mudarA(placarJ, 'J')
    $('#placarJ')[0].innerHTML = placarJ
    cartasUsadas += 1
    twentyOne(placarJ)
}
function fim(v) {
    $('.verso').attr("src", 'img/' + $('.verso')[0].id + '.png')
    placarC += aux[3]
    $('#placarC')[0].innerHTML = placarC
    if (v == '22') {
        alert('ultrapassou, perdeu')
        setTimeout(() => {
            primeCartas()
        }, 3000);
    }
    else {
        setTimeout(() => {//pausa para mostrar a carta invertida
            const intervalo = setInterval(() => {//mostra as outra cartas em intervalos
                console.log(placarC)
                if (placarC >= 17) {
                    clearInterval(intervalo);
                    setTimeout(() => {
                        if (placarC == placarJ) {
                            alert('empate')
                        }
                        else if (placarC > placarJ && placarC <= 21) {
                            alert('vc perdeu')
                        }
                        else {
                            alert('vc ganhou')
                        }
                        setTimeout(() => {
                            primeCartas()
                        }, 3000);
                    }, 1000);
                }
                else {
                    console.log(placarC+'s')
                    $('#cartasCRod').append('<h4 id=C' + MonteJ[cartasUsadas].replace(/[a-z]/g, '') + '><img src="img/' + MonteJ[cartasUsadas] + '.png" alt=""></h4>')
                    placarC += parseInt(MonteJ[cartasUsadas].replace(/[a-z]/g, '').replace('A11', 11).replace(/[J-Q]/g, 10))
                    mudarA(placarC, 'C')
                    $('#placarC')[0].innerHTML = placarC
                    cartasUsadas += 1
                    console.log(placarC+'s')
                }
            }, 1000);

        }, 1000);
    }
}