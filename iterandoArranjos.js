const promptsync = require('prompt-sync');
const prompt = promptsync({sigint: true});

let numeros = [10,30,20,50,40];
let soma = 0;

/* primeira forma:
for(let i=0; i < numeros.length; i++){
    soma = soma + numeros[i];
} */

/* segunda forma:
let cont = 0;
while(cont < numeros.length){
    soma = soma + numeros[cont];
} */

// terceira forma: (forEach)
for(let numero of numeros){
    soma = soma + numero;
}