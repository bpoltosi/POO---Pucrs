const { validate } = require("bycontract");

class ContaComum {
    #numeroIdentificador;
    #saldo;

    constructor(numeroIdentificador){
        validate(arguments,["number"]);
        this.#numeroIdentificador = numeroIdentificador;
        this.#saldo = 0;
    }

    get numeroIdentificador(){
        return this.#numeroIdentificador;
    }
    get saldo(){
        return this.#saldo;
    }

    deposito(valor){
        validate(arguments,["number"]);
        if(valor<0){
            return false;
        }
        this.#saldo += valor;
        return true;
    }

    retirada(valor){
        validate(arguments,["number"]);
        if(valor<0){
            return false;
        }
        if(this.#saldo - valor < 0){ // nao tem dinheiro suficiente
            return false;
        }
        this.#saldo -= valor;
        return true;
    }

    toString(){
        return `Numero: ${this.numeroIdentificador}, Saldo = ${this.saldo.toFixed(2)}`; // nao usar o #saldo
    }
}

class ContaPoupanca extends ContaComum{

    constructor(numero){
        super(numero);
    }

    calculaJuros(taxa){
        validate(arguments,["number"]);
        if(taxa < 0.0 || taxa > 1.0){
            return false;
        }
        let juros = this.saldo * taxa;
        this.deposito(juros);
        return true;
    }
}

class ContaLimite extends ContaComum{
    #limite
    
    constructor(numero,limite){
        validate(arguments,["number","number"]);
        super(numero);
        this.#limite = limite;
        this.deposito(limite);
    }

    get limite(){
        return this.#limite;
    }
    get saldo(){
        let s = super.saldo;
        s = s - this.#limite;
        return s;
    }
}

let cp = new ContaPoupanca(102);
console.log("\n");
console.log(cp.toString());
cp.deposito(12000);
cp.calculaJuros(0.2);
cp.retirada(10000);
console.log(cp.toString());

console.log('-----------');

let c1 = new ContaLimite(200,1000);
console.log(c1.toString());
c1.retirada(200)
console.log(c1.toString());