const promptsync = require("prompt-sync");
const prompt = promptsync({ sigint: true });
const { validate } = require("bycontract");

function randomInt(min, max) {
  validate(arguments, ["Number", "Number"]);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function multiplicaNegativos(first) {
  validate(first, "Number[]");
  for (let i = 0; i < first.length; i++) {
    if (first[i] < 0) {
      first[i] = first[i] * -2;
    }
  }

  return first;
}

function maiorMenor(first, maior) {
    validate(arguments,["Number[]","boolean"]);
    let resp = first[0];
  if (maior == true) {
    for (let i = 1; i < first.length; i++) {
      if (resp < first[i]) {
        resp = first[i];
      }
    }
    } else {
    for (let i = 1; i < first.length; i++) {
      if (resp > first[i]) {
        resp = first[i];
      }
    }
  }
  return resp;
}

let numeros = new Array(100);
for (let i = 0; i < 100; i++) {
  numeros[i] = randomInt(-100, 100);
}

console.log(numeros);
console.log(multiplicaNegativos(numeros));
console.log(maiorMenor(numeros,true)); //maior
console.log(maiorMenor(numeros,false)); //menor
