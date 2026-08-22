import nReadLines from "n-readlines";

let arquivo = new nReadLines('umTexto.txt');
let buf;
let dados;
let linha;

let palavras = new Set();
while(buf = arquivo.next()){
    linha = buf.toString('utf8');
    dados = linha.split(' ');
    for(let pal of dados){
        palavras.add(pal);
    }
}

for(let p of palavras){
    console.log(p);
}