const { validate } = require("bycontract");

class Passagem {
    #data;
    #numeroVoo;
    #custoBase;

    constructor(data, numeroVoo, custoBase) {
        validate(arguments, ["string", "number", "number"]);
        this.#data = data;
        this.#numeroVoo = numeroVoo;
        this.#custoBase = custoBase;
    }

    get data() {
        return this.#data;
    }
    get numeroVoo() {
        return this.#numeroVoo;
    }
    get custoBase() {
        return this.#custoBase;
    }
    totalAPagar() {
        return undefined;
    }
    quantidadeMalas() {
        return 0;
    }
    acessoPrioritario() {
        return false;
    }
    toString() {
        let str = `\nData da Passagem: ${this.data}\nNumero do Voo: ${this.numeroVoo}\nValor: ${this.totalAPagar().toFixed(2)}`;
        str += `, malas: ${this.quantidadeMalas()}\nAcesso Prioritario: ${this.acessoPrioritario()}\n`;
        return str;
    }
}

class Economica extends Passagem {
    constructor(data, numeroVoo, custoBase) {
        super(data, numeroVoo, custoBase);
    }
    totalAPagar() {
        return this.custoBase;
    }
    toString() {
        return "Economica: " + super.toString();
    }
}

class Executiva extends Passagem {
    constructor(data, numeroVoo, custoBase) {
        super(data, numeroVoo, custoBase);
    }
    totalAPagar() {
        return this.custoBase + this.custoBase * 0.3;
    }
    quantidadeMalas() {
        return 1;
    }
    toString() {
        return "Executiva: " + super.toString();
    }
}

class PrimeiraClasse extends Passagem {
    constructor(data, numeroVoo, custoBase) {
        super(data, numeroVoo, custoBase);
    }

    totalAPagar() {
        return this.custoBase + this.custoBase * 0.5;
    }
    quantidadeMalas() {
        return 3;
    }
    acessoPrioritario() {
        return true;
    }
    toString() {
        return "Primeira Classe: " + super.toString();
    }
}

function criarPassagem(data, numeroVoo, custoBase, tipo) {
    validate(arguments, ["string", "number", "number", "string"]);

    if (tipo === "economica") {
        return new Economica(data, numeroVoo, custoBase);
    }
    if (tipo === "executiva") {
        return new Executiva(data, numeroVoo, custoBase);
    }
    if (tipo === "primeiraClasse") {
        return new PrimeiraClasse(data, numeroVoo, custoBase);
    }
    return undefined;
}

function quantidadeMalasTotal(passagens) {
    validate(arguments, ["Array"]);

    let contMalas = 0;
    let contPrioritario = 0;

    for (let p of passagens) {
        contMalas += p.quantidadeMalas();
        if (p.acessoPrioritario()) {
            contPrioritario++;
        }
    }
    return `\nQuantidade de malas: ${contMalas}\nQuantidade de passageiros com acesso prioritario: ${contPrioritario}\n`;
}

let passagens = [];

passagens.push(new Economica("01/01/2024", 123, 1000));
passagens.push(new Executiva("01/01/2024", 123, 1000));
passagens.push(new PrimeiraClasse("01/01/2024", 123, 1000));

for (let i = 0; i < passagens.length; i++) {
    console.log(passagens[i].toString());
}

let resp = quantidadeMalasTotal(passagens);
console.log(resp);