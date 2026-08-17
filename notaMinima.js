const promptsync = require('prompt-sync');
const prompt = promptsync({sigint: true});

const notaMinima = 7.0;
let nome = "Bruno";
let nota1 = Number(prompt("Qual a primeira nota? "));
let nota2 = 6.0;
let media = (nota1 + nota2) / 2;

console.log(`Nome: ${nome}, média: ${media}`);