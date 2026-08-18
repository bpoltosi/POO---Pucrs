const promptsync = require('prompt-sync');
const prompt = promptsync({ sigint: true });

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function multiplicaNegativos(first) {
    for (let i = 0; i < first.length; i++) {
        if (first[i] < 0) {
            first[i] = first[i] * -2;
        }
    }

    return first;
}

function menor(first) {
    let menor = first[0];

    for (let i = 1; i < first.length; i++) {
        if (menor > first[i]) {
            menor = first[i];
        }
    }

    return menor;
}

let numeros = new Array(100);

for (let i = 0; i < 100; i++) {
    numeros[i] = randomInt(-100, 100);
}

console.log(numeros);
console.log(multiplicaNegativos(numeros));
console.log(menor(numeros));