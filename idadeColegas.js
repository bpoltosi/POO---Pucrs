const promptsync = require('prompt-sync');
const prompt = promptsync({sigint: true});

let idades = [];
let terminou = false;
let cont = 0;

while(!terminou){
    let idade = Number(prompt(`Entre a idade do ${cont+1}o colega: `));
    if (Number(idade) == -1){
        break;
    }
    idades[cont] = idade;
    cont++;
}

let resposta = prompt("De qual idade deseja verificar a frequencia? ");
let idadeFreq = Number(resposta);
let freq = 0;
let maiores = 0;

for(let i=0; i < idades.length; i++){
    if (idades[i] == idadeFreq){
        freq++;
    }
    if (idades[i] > idadeFreq){
        maiores++;
    }
}
console.log(`Quantidade colegas com ${idadeFreq} anos: ${freq} `);
console.log(`Quantidade de colegas com mais de ${idadeFreq}: ${maiores}`);