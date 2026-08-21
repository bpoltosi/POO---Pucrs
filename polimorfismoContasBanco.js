const { validate } = require("bycontract");

class ContaComum {
    #saldo;
    #numeroConta;

    constructor(numeroC) {
        validate(arguments, ["number"]);
        this.#numeroConta = numeroC;
        this.#saldo = 0;
    }

    get saldo() {
        return this.#saldo;
    }

    get numeroConta() {
        return this.#numeroConta;
    }

    depositar(valor) {
        validate(arguments, ["number"]);

        if (valor <= 0) {
            return false;
        }

        this.#saldo += valor;
        return true;
    }

    retirar(valor) {
        validate(arguments, ["number"]);

        if (valor < 0 || valor > this.#saldo) {
            return false;
        }

        this.#saldo -= valor;
        return true;
    }

    toString() {
        return `Numero da Conta: ${this.numeroConta}\nSaldo: ${this.saldo.toFixed(2)}\n`;
    }
}

class ContaPoupanca extends ContaComum {
    constructor(numeroC) {
        validate(arguments, ["number"]);
        super(numeroC);
    }

    calculaJuros(taxa) {
        validate(arguments, ["number"]);

        if (taxa < 0 || taxa > 1) {
            return false;
        }

        let juros = this.saldo * taxa;
        this.depositar(juros);
        return true;
    }
}

class ContaLimite extends ContaComum {
    #limite;

    constructor(numeroC, limite) {
        validate(arguments, ["number", "number"]);
        super(numeroC);
        this.#limite = limite;
        this.depositar(limite);
    }

    get limite() {
        return this.#limite;
    }

    get saldo() {
        let s = super.saldo;
        s -= this.limite;
        return s;
    }
}

globalThis.ContaComum = ContaComum;
globalThis.ContaPoupanca = ContaPoupanca;
globalThis.ContaLimite = ContaLimite;

function imprimeNumerosSaldos(contas) {
    validate(arguments, ["Array.<ContaComum>"]);

    for (let conta of contas) {
        console.log(`Numero da Conta: ${conta.numeroConta}\nSaldo: ${conta.saldo.toFixed(2)}\n`);
    }
}

function depositoInicial(contas, valor) {
    validate(arguments, ["Array.<ContaComum>", "number"]);

    for (let conta of contas) {
        conta.depositar(valor);
    }
}

function creditarJuros(contas, taxa) {
    validate(arguments, ["Array.<ContaComum>", "number"]);

    for (let conta of contas) {
        if (conta instanceof ContaPoupanca) {
            conta.calculaJuros(taxa);
        }
    }
}

let agencia = new Array();

agencia.push(new ContaComum(1));
agencia.push(new ContaPoupanca(2));
agencia.push(new ContaLimite(3, 1000));

depositoInicial(agencia, 1000);
creditarJuros(agencia, 0.025);

agencia[0].depositar(1500);
agencia[2].retirar(4500);

imprimeNumerosSaldos(agencia);