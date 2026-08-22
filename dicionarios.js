import nReadlines from "n-readlines";

let arquivo = new nReadlines('palavras.txt');
let buf;
let palavra;

let freq = new Map();

while(bif = arquivo.next()){
    palavra = buf.toString('utf8');
    if(freq.has(palavra)){
        let contador = freq.get(palavra);
        freq.set(palavra,c+1);
    } else {
        freq.set(palavra,1);
    }
}

for(let k of freq.keys()){
    console.log(`${k}:${freq.get(k)}`);
}