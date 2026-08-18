const promptsync = require('prompt-sync');
const prompt = promptsync({sigint: true});

let first = [];
first[0] = 10;
first[2] = 20;
first[3] = '10';
first[4] = 30;

let z = first[1];
let soma = 0;

for(let i = 0; i < first.length; i++){
    soma += first[i];
}