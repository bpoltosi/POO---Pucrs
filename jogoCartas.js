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
        return ["A", "2", "3", "4", "5", "6", "7",
                "8", "9", "10", "J", "Q", "K"];
    }

    naipes() {
        return ["ouros", "paus", "espadas", "copas"];
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
        return this.naipes().includes(naipe.toLowerCase());
    }

    verificaValor(valor) {
        validate(arguments, ["String"]);
        return this.valores().includes(valor.toUpperCase());
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
        if (this.#naipe === "inválido" || this.#valor === "inválido") {
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
                this.#cartas[this.#topo] = new Carta(
                    naipes[n],
                    valores[v]
                );

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

        if (this.#topo >= this.#cartas.length) {
            throw new Error("Baralho cheio!");
        }

        for (let i = this.#topo; i > 0; i--) {
            this.#cartas[i] = this.#cartas[i - 1];
        }

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


class Deque {
    #cartas;
    #topo;

    constructor() {
        this.#cartas = new Array(52);
        this.#topo = 0;
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

        if (this.#topo >= this.#cartas.length) {
            throw new Error("Deque cheio!");
        }

        for (let i = this.#topo; i > 0; i--) {
            this.#cartas[i] = this.#cartas[i - 1];
        }

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
let dj1 = new Deque();
let dj2 = new Deque();

b.embaralha();

while (b.quantidade() > 0) {
    let c1 = b.pegaDeCima();
    let c2 = b.pegaDeCima();

    if (c1 !== null) {
        dj1.insereEmbaixo(c1);
    }

    if (c2 !== null) {
        dj2.insereEmbaixo(c2);
    }
}


let rodada = 0;

while (dj1.quantidade() !== 0 && dj2.quantidade() !== 0) {
    rodada++;

    let cj1 = dj1.pegaDeCima();
    let cj2 = dj2.pegaDeCima();

    console.log(`Rodada: ${rodada}`);
    console.log(`Carta do Jogador 1: ${cj1.toString()}`);
    console.log(`Carta do Jogador 2: ${cj2.toString()}`);

    if (cj1.toInt() > cj2.toInt()) {
        dj1.insereEmbaixo(cj1);
        dj1.insereEmbaixo(cj2);

        console.log("Jogador 1 venceu a rodada!");
    }
    else if (cj1.toInt() < cj2.toInt()) {
        dj2.insereEmbaixo(cj1);
        dj2.insereEmbaixo(cj2);

        console.log("Jogador 2 venceu a rodada!");
    }
    else {
        console.log("Rodada empatada!");

        dj1.insereEmbaixo(cj1);
        dj2.insereEmbaixo(cj2);
    }

    console.log("");
}
if (dj1.quantidade() === 0) {
    console.log("Jogador 2 venceu o jogo!");
}
else {
    console.log("Jogador 1 venceu o jogo!");
}
console.log(`Cartas do Jogador 1: ${dj1.quantidade()}`);
console.log(`Cartas do Jogador 2: ${dj2.quantidade()}`);
