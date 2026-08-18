const promptsync = require('prompt-sync');
const prompt = promptsync({sigint: true});

function nivelAcessoOk(nivelAcesso){
    switch(nivelAcesso){
        case '01':
        case '21':
        case '35':
        case '66':
            return true;
        default:
            return false;
    }
}

function acrescentaVerificado(matricula, nivelAcesso=21){
let digitos = matricula;
let soma = 0;

    while(digitos.length != 1){
        for (let i=0; i < digitos.length; i++){
            soma = soma + Number(digitos.at(i));
        }
    digitos = String(soma);
    soma = 0;
    }
    return nivelAcesso+matricula+'-'+digitos;
}

let matricula = prompt('Entre com seu numero de matricula: ');
let nivel = prompt("Entre com seu numero de acesso: ");

if(nivelAcessoOk(nivel) == false){
let matriculaCompleta = acrescentaVerificado(matricula);
console.log(`Numero de matricula completo: ${matricula}`);
} else{
    console.log("Nivel de acesso inválido!");
}