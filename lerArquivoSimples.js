import { validate } from "bycontract";
import nReadlines from "n-readlines"

function exibeArquivo(nomeArquivo){
    validate(nomeArquivo,'string');

    //localiza o arquivo
    let arquivo = new nReadlines(nomeArquivo);
    let buf = "";

// enquanto houverem proximas linhas = le o conteudo
    while(buf = arquivo.next()){
        let linha = buf.toString('utf8');   //ajusta o formato
        console.log(linha);
    }
}

console.log("\n------------------\n");
exibeArquivo("TextoSimples.Txt") //nome do arquivo
console.log("\n------------------\n");