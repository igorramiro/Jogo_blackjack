var Monte = ['A11flo', '2flo', '3flo', '4flo', '5flo', '6flo', '7flo', '8flo', '9flo', '10flo', 'Jflo', 'Qflo', 'Kflo',
    'A11cor', '2cor', '3cor', '4cor', '5cor', '6cor', '7cor', '8cor', '9cor', '10cor', 'Jcor', 'Qcor', 'Kcor',
    'A11esp', '2esp', '3esp', '4esp', '5esp', '6esp', '7esp', '8esp', '9esp', '10esp', 'Jesp', 'Qesp', 'Kesp',
    'A11dia', '2dia', '3dia', '4dia', '5dia', '6dia', '7dia', '8dia', '9dia', '10dia', 'Jdia', 'Qdia', 'Kdia']

var placarJ = 0
var placarC = 0
var cartasUsadas = 0
var aux = [1, 2, 3, 4]
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
        aux[i] = MonteJ[cartasUsadas + i].replace(/[a-z]/g, '').replace('A11', 11).replace(/[J-Q]/g, 10)
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
    if (cartas >= 21) {
        fim()
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
function fim() {
    $('.verso').attr("src", 'img/' + $('.verso')[0].id + '.png')
    placarC += aux[3]
    $('#placarC')[0].innerHTML = placarC
    const intervalo = setInterval(() => {//mostra as outras cartas em intervalos
        if (placarC >= 17 || placarJ > 21) {
            clearInterval(intervalo);
            if (placarC == placarJ) {
                $('#anuncio').css('background-color', '#ff9800')
                $('#anuncio')[0].innerHTML = "Empate"
            }
            else if ((placarC > placarJ && placarC <= 21) || placarJ > 21) {
                $('#anuncio').css('background-color', '#f44336')
                $('#anuncio')[0].innerHTML = "Você perdeu"
            }
            else {
                $('#anuncio').css('background-color', '#04AA6D')
                $('#anuncio')[0].innerHTML = "Você ganhou"
            }
            $('#anuncio').show()
            setTimeout(() => {
                $('#anuncio').hide()
                primeCartas()
            }, 3000);
        }
        else {
            $('#cartasCRod').append('<h4 id=C' + MonteJ[cartasUsadas].replace(/[a-z]/g, '') + '><img src="img/' + MonteJ[cartasUsadas] + '.png" alt=""></h4>')
            placarC += parseInt(MonteJ[cartasUsadas].replace(/[a-z]/g, '').replace('A11', 11).replace(/[J-Q]/g, 10))
            mudarA(placarC, 'C')
            $('#placarC')[0].innerHTML = placarC
            cartasUsadas += 1
        }
    }, 1000);
}