import nReadlines from "n-readlines";
import promptSync from "prompt-sync";
const prompt = promptSync();

let arquivo = new nReadlines('produtos.txt');
let buf;
let linha;
let dados;

arquivo.next();

let produtos = new Map();

while(buf = arquivo.next()){
    linha = buf.toString('utf8');
    dados = linha.split(',');
    produtos.set(dados[0],
        {
            "descricao":dados[1],
            "preco":Number(dados[2])
        });
}

let fim =false;
while(!fim){
    let codigo = prompt('Entre o codigo do produto (0=finalizar sessao): ');
    if (codigo === "0"){
        fim = true;
        continue;
    }
    if(produtos.has(codigo)){
        let codigoProduto = produtos.get(codigo);
        console.log(codigoProduto);
    } else {
        console.log('Produto inexistente!');
    }
}