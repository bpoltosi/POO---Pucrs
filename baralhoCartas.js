// cria baralho de cartas, valida e trata erros, pega as cartas de cima e insere em baixo

const promptsync = require("prompt-sync");
const prompt = promptsync({ sigint: true });
const { validate } = require("bycontract");

class Carta {
    #naipe;
    #valor;
    #faceParaCima;

    constructor(naipe, valor) {
        validate(arguments, ["String", "String"]);
        this.#faceParaCima = true;
        if (!this.verificaNaipe(naipe) || !this.verificaValor(valor)) {
            this.#naipe = "inválido";
            this.#valor = "inválido";
            return;
        }
        this.#naipe = naipe.toLowerCase();
        this.#valor = valor.toUpperCase();
    }

    valores() {
        return ["A", "2", "3", "4", "5", "6", "7","8", "9", "10", "J", "Q", "K"];
    }

    naipes() {
        return ["ouros","paus","espadas","copas"];
    }

    toInt() {
        switch (this.#valor) {
            case "A":
                return 14;

            case "K":
                return 13;

            case "Q":
                return 12;

            case "J":
                return 11;

            default:
                return Number(this.#valor);
        }
    }

    verificaNaipe(naipe) {
        validate(arguments, ["String"]);
        naipe = naipe.toLowerCase();
        return this.naipes().includes(naipe);
    }

    verificaValor(valor) {
        validate(arguments, ["String"]);
        valor = valor.toUpperCase();
        return this.valores().includes(valor);
    }

    get naipe() {
        return this.#naipe;
    }

    set naipe(n) {
        if (!this.verificaNaipe(n)) {
            this.#naipe = "inválido";
        } else {
            this.#naipe = n.toLowerCase();
        }
    }

    get valor() {
        return this.#valor;
    }

    set valor(val) {
        if (!this.verificaValor(val)) {
            this.#valor = "inválido";
        } else {
            this.#valor = val.toUpperCase();
        }
    }

    virada() {
        return this.#faceParaCima;
    }

    vira() {
        this.#faceParaCima = !this.#faceParaCima;
    }

    toString() {
        if (
            this.#naipe === "inválido" ||
            this.#valor === "inválido"
        ) {
            return "Carta inválida!";
        }

        return `${this.#valor}, ${this.#naipe}`;
    }
}


class Baralho {
    #cartas;
    #topo;

    constructor() {
        this.#cartas = new Array(52);
        let aux = new Carta("Ouros", "A");
        let naipes = aux.naipes();
        let valores = aux.valores();

        this.#topo = 0;

        for (let n = 0; n < naipes.length; n++) {
            for (let v = 0; v < valores.length; v++) {
                let cartaAuxiliar = new Carta(
                    naipes[n],
                    valores[v]
                );

                this.#cartas[this.#topo] = cartaAuxiliar;
                this.#topo++;
            }
        }
    }

    embaralha() {
        for (let i = 0; i < 1000; i++) {
            let i1 = Math.floor(Math.random() * this.#topo);
            let i2 = Math.floor(Math.random() * this.#topo);
            let aux = this.#cartas[i1];
            this.#cartas[i1] = this.#cartas[i2];
            this.#cartas[i2] = aux;
        }
    }

    pegaDeCima() {
        if (this.#topo === 0) {
            return null;
        }
        this.#topo--;
        return this.#cartas[this.#topo];
    }

    insereEmbaixo(carta) {
        validate(arguments, [Carta]);
        // Abre espaço na posição 0
        for (let i = this.#topo; i > 0; i--) {
            this.#cartas[i] = this.#cartas[i - 1];
        }
        // Insere a carta na parte de baixo
        this.#cartas[0] = carta;
        this.#topo++;
    }

    quantidade() {
        return this.#topo;
    }

    toString() {
        let str = `Quantidade de cartas: ${this.#topo}\n`;
        for (let i = 0; i < this.#topo; i++) {
            str += `[${this.#cartas[i].toString()}]\n`;
        }
        return str;
    }
}

let b = new Baralho();

b.embaralha();
console.log(b.toString());

let c1 = b.pegaDeCima();
let c2 = b.pegaDeCima();
let c3 = b.pegaDeCima();

console.log("Carta retirada:");
console.log(c1.toString());

console.log("\nBaralho depois de retirar 3 cartas:");
console.log(b.toString());

b.insereEmbaixo(c2);

console.log("\nBaralho depois de inserir c2 embaixo:");
console.log(b.toString());
