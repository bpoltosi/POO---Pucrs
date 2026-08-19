const promptsync = require("prompt-sync");
const prompt = promptsync({ sigint: true });
const { validate } = require("bycontract");

class Carro {
    #placa;
    #marcaModelo;
    #tamanhoTanque;
    #combustivelNoTanque;
    #consumo;

    constructor(placa, marcaModelo, tamanhoTanque, consumo) {
        validate(arguments, ["string", "string", "Number", "Number"]);

        this.#placa = placa;
        this.#marcaModelo = marcaModelo;

        if (tamanhoTanque < 0) {
            this.#tamanhoTanque = 45;
        } else {
            this.#tamanhoTanque = tamanhoTanque;
        }

        if (consumo <= 0) {
            this.#consumo = 10;
        } else {
            this.#consumo = consumo;
        }

        this.#combustivelNoTanque = 0;
    }

    get placa() {
        return this.#placa;
    }

    get marcaModelo() {
        return this.#marcaModelo;
    }

    get tamanhoTanque() {
        return this.#tamanhoTanque;
    }

    get combustivelNoTanque() {
        return this.#combustivelNoTanque;
    }

    get consumo() {
        return this.#consumo;
    }

    abastece(quantidade) {
        validate(quantidade, "Number");

        if (quantidade <= 0) {
            return false;
        }

        if (this.combustivelNoTanque + quantidade > this.tamanhoTanque) {
            return false;
        }

        this.#combustivelNoTanque += quantidade;

        return true;
    }

    combustivelNecessario(distancia) {
        validate(distancia, "Number");

        return distancia / this.consumo;
    }

    podeViajar(distancia) {
        validate(distancia, "Number");

        let combNec = this.combustivelNecessario(distancia);

        if (combNec <= this.combustivelNoTanque) {
            return true;
        } else {
            return false;
        }
    }

    viaja(distancia) {
        validate(distancia, "Number");

        if (this.podeViajar(distancia)) {
            this.#combustivelNoTanque -=
                this.combustivelNecessario(distancia);

            return true;
        }

        return false;
    }

    toString() {
        let str = `Placa: ${this.placa}, Marca/Modelo: ${this.marcaModelo}\n`;

        str += `Tamanho tanque: ${this.tamanhoTanque}, `;
        str += `Combustível no tanque: ${this.combustivelNoTanque}, `;
        str += `Consumo: ${this.consumo}`;

        return str;
    }
}

let c1 = new Carro(
    "ABC1023",
    "Chevrolet/Corsa",
    45,
    12
);

console.log(c1.toString());

console.log("\nAbastecendo 30 litros...\n");

c1.abastece(30);

let distancia = 300;

// calcula o combustível necessário ANTES da viagem
let combNec = c1.combustivelNecessario(distancia);

console.log(
    `Combustível necessário para viajar ${distancia} km = ${combNec} litros`
);

if (c1.podeViajar(distancia)) {
    console.log("Pode viajar!");

    c1.viaja(distancia);
} else {
    console.log("Não pode viajar, abasteça primeiro!");
}

console.log("\nSituação do carro após a tentativa de viagem:");

console.log(c1.toString());
