import { validate } from "bycontract";
import nReadlines from "n-readlines";

class Vagao {
    #id;
    #capCarga;
    #livre;

    constructor(id, capCarga) {
        validate(arguments, ["number", "number"]);
        if (id <= 0 || capCarga <= 0) {
            throw new Error("Dados invalidos!");
        }

        this.#id = id;
        this.#capCarga = capCarga;
        this.#livre = true;
    }

    get id() {
        return this.#id;
    }
    get capCarga() {
        return this.#capCarga;
    }
    get livre() {
        return this.#livre;
    }

    ocupa() {
        this.#livre = false;
    }
    libera() {
        this.#livre = true;
    }
    toString() {
        return `[Vagao: ${this.#id}, capacidade de carga: ${this.#capCarga}]`;
    }
}

class GaragemDeVagoes {
    #vagoes;

    constructor(nomeArquivo) {
        validate(arguments, ["string"]);

        this.#vagoes = [];
        this.carregaDados(nomeArquivo);
    }

    carregaDados(nomeArquivo) {
        let arq = new nReadlines(nomeArquivo);
        let buf;

        arq.next();

        while ((buf = arq.next())) {
            let linha = buf.toString("utf8");
            let dados = linha.split(",");
            let id = Number(dados[0]);
            let capCarga = Number(dados[1]);
            let vagao = new Vagao(id, capCarga);

            this.#vagoes.push(vagao);
        }
    }
    get vagoes() {
        return this.#vagoes.values();
    }
}

let gv = new GaragemDeVagoes("Vagoes.csv");
for (let v of gv.vagoes) {
    console.log(v.toString());
}