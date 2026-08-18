const promptsync = require('prompt-sync');
const prompt = promptsync({sigint: true});

function imprimeMensagemFixa(){
    console.log('JavaScript para sistemas Web');
}

function imprimeMensagemVariavel(mensagem){
    console.log(`Mensagem: ${mensagem}`);
}

function calculaMedia(v1,v2,v3){
    let calculo = ((v1+v2+v3)/3);
    return(calculo);
}

imprimeMensagemFixa();
imprimeMensagemVariavel('JavaScritp é show!');
let resultado = calculaMedia(7,9,6);
console.log(`Media: ${resultado.toFixed(1)}`)