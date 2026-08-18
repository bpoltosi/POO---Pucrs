const promptsync = require('prompt-sync');
const prompt = promptsync({sigint: true});

let megaSena = [23,81,15,50,25,19];
x = megaSena[0];
x = megaSena[5];
megaSena[2] = 1;
megaSena[4] = 99;
console.log(megaSena[2]);
console.log(megaSena[3]);
console.log(megaSena[4]);