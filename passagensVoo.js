const { validate } = require("bycontract");

class Passagem{
    #data;
    #numeroVoo;
    #custoBase;

    constructor(data,numeroVoo,custoBase){
        validate(arguments,["string","number","number"]);
        this.#data = data;
        this.#numeroVoo = numeroVoo;
        this.#custoBase = custoBase;
    }
    get data(){
        return this.#data;
    }
    get numeroVoo(){
        return this.#numeroVoo;
    }
    get custoBase(){
        return this.#custoBase;
    }
    totalAPagar(){
        return undefined;
    }
    quantidadeMalas(){
        return 0;
    }
    acessoPrioritario(){
        return false;
    }
    toString(){         //informacoes basicas da passagem
        let str = `\nData da Passagem: ${this.data}\nNumero do Voo: ${this.numeroVoo}\nValor: ${this.totalAPagar().toFixed(2)}`;
        str += `, malas: ${this.quantidadeMalas()}\nAcesso Prioritario: ${this.acessoPrioritario()}\n`;
        return str;
    }
}

class Economica extends Passagem{
    constructor(data,numeroVoo,custoBase){
        super(data,numeroVoo,custoBase);
    }
    totalAPagar(){
        return this.custoBase;
    }
    toString(){     //detalhes da passagem economica
        return 'Economica: '+super.toString();
    }
}

class Executiva extends Passagem{
    constructor(data,numeroVoo,custoBase){
        super(data,numeroVoo,custoBase);
    }
    totalAPagar(){
        let operacional = this.custoBase * 0.3;
        return this.custoBase + operacional;
    }
    quantidadeMalas(){
        return 1;
    }
    toString(){         //detalhes da passagem executiva
        return 'Executiva: '+super.toString();
    }
}

class PrimeiraClasse extends Passagem{
    constructor(data,numeroVoo,custoBase){
        super(data,numeroVoo,custoBase);
    }
    totalAPagar(){
        let operacional = this.custoBase * 0.5;
        return this.custoBase + operacional;
    }
    quantidadeMalas(){
        return 3;
    }
    acessoPrioritario(){
        return true;
    }
    toString(){         //detalhes da passagem primeira classe
        return 'Primeira Classe: '+super.toString();
    }
}

function criarPassagem(data,numeroVoo,custoBase,tipo){
    validate(arguments,["string","number","number","string"]);
    let passagem = undefined; //variavel que vai receber a passagem criada

    if(tipo === "economica"){
        passagem = new Economica(data,numeroVoo,custoBase);
        return passagem;
    }
    if(tipo === "executiva"){
        passagem = new Executiva(data,numeroVoo,custoBase);
        return passagem;
    }
    if(tipo === "primeiraClasse"){
        passagem = new PrimeiraClasse(data,numeroVoo,custoBase);
        return passagem;
    }
}

//criando passagens para teste
let passagem1 = criarPassagem("01/01/2024",123,1000,"economica");
let passagem2 = criarPassagem("01/01/2024",123,1000,"executiva");
let passagem3 = criarPassagem("01/01/2024",123,1000,"primeiraClasse");

//imprimindo detalhes das passagens criadas
console.log(passagem1.toString());
console.log(passagem2.toString());
console.log(passagem3.toString());