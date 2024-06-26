//array mumeros ja sorteados
let numerosSorteados = [];
let numeroLimite = 10;
//numero secreto para iniciar o jogo com a funcao de ramdom
let NumeroSecret = gerarNumero();
//numero de tentativas
let tentativas = 1;

mensagemInicial();
//funcao para trocar titulo e paragrafo
function exibirTextoHtml(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
function mensagemInicial(){
    exibirTextoHtml('h1', 'Jogo do Número Secreto');
    exibirTextoHtml('p', 'Escolha um Número entre 1 e 10: ');
}

//func que gera diferentes numeros para o jogo
function gerarNumero(){
    let numeroGerado = parseInt(Math.random()* numeroLimite+1);
    let qntNumerosGerados = numerosSorteados.length;
    if(qntNumerosGerados == numeroLimite){
        numerosSorteados = [];
    }

    if(numerosSorteados.includes(numeroGerado)){
        return gerarNumero();
    }else{
        numerosSorteados.push(numeroGerado);
        return numeroGerado;
    }
}
//func que limpa o campo
function limparChute(){
    chute = document.querySelector('input');
    chute.value = '';
}
//func para resetar game
function resetGame(){
    let NumeroSecret = gerarNumero();
    limparChute();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}


function verificarChute(){
    let chute = document.querySelector('input').value
    if(chute == NumeroSecret){
        exibirTextoHtml('h1', 'Acertou!');
        let palavraTentativa = tentativas >1 ? 'Tentativas': 'Tentativa';
        let mensagem = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}, parabéns!`;
        exibirTextoHtml('p', mensagem);

        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > NumeroSecret){
            exibirTextoHtml('p', 'O numero é menor que seu chute!');
        }else{
            exibirTextoHtml('p', 'O numero é maior que o chute');
        }
        tentativas++;
        limparChute();
    }
}