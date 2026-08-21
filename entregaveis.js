import { validate, typedef } from "bycontract";

typedef("#Transportavel", {
    fragil: "boolean",
    valorFrete: "number"
});

function isTransportavel(obj) {
    return "fragil" in obj && "valorFrete" in obj;
}

typedef("#Taxavel", {
    valorImposto: "number"
});

function isTaxavel(obj) {
    return "valorImposto" in obj;
}

class Entregavel {
    #id;
    #descricao;

    constructor(id, descricao) {
        validate(arguments, ["number", "string"]);
        this.#id = id;
        this.#descricao = descricao;
    }

    get id() {
        return this.#id;
    }

    get descricao() {
        return this.#descricao;
    }
}

class Produto extends Entregavel {
    #preco;
    #fragil;
    #valorFrete;

    constructor(id, descricao, preco, fragil = false, valorFrete = 0) {
        validate(arguments, ["number", "string", "number", "boolean", "number"]);
        super(id, descricao);

        this.#preco = preco;
        this.#fragil = fragil;
        this.#valorFrete = valorFrete;
    }

    get preco() {
        return this.#preco;
    }

    get fragil() {
        return this.#fragil;
    }

    get valorFrete() {
        return this.#valorFrete;
    }

    get valorImposto() {
        return this.#preco * 0.05;
    }
}

class Servico extends Entregavel {
    #valorHora;

    constructor(id, descricao, valorHora) {
        validate(arguments, ["number", "string", "number"]);
        super(id, descricao);
        this.#valorHora = valorHora;
    }

    get valorHora() {
        return this.#valorHora;
    }

    get valorImposto() {
        return this.#valorHora * 0.05;
    }
}

class ServicoVoluntario extends Entregavel {
    #nomeVoluntario;

    constructor(id, descricao, nomeVoluntario) {
        validate(arguments, ["number", "string", "string"]);
        super(id, descricao);
        this.#nomeVoluntario = nomeVoluntario;
    }

    get nomeVoluntario() {
        return this.#nomeVoluntario;
    }
}

class Veiculo {
    #placa;
    #ano;
    #valor;

    constructor(placa, ano, valor) {
        validate(arguments, ["string", "number", "number"]);
        this.#placa = placa;
        this.#ano = ano;
        this.#valor = valor;
    }

    get placa() {
        return this.#placa;
    }

    get ano() {
        return this.#ano;
    }

    get valor() {
        return this.#valor;
    }

    get valorImposto() {
        return this.#valor * 0.03;
    }
}

globalThis.Entregavel = Entregavel;
globalThis.Produto = Produto;
globalThis.Servico = Servico;
globalThis.ServicoVoluntario = ServicoVoluntario;
globalThis.Veiculo = Veiculo;

function quantidadeProdutosServicos(taxaveis) {
    validate(arguments, ["Array"]);

    let quantosProdutos = 0;
    let quantosServicos = 0;

    for (let t of taxaveis) {
        if (t instanceof Produto) {
            quantosProdutos++;
        } else if (t instanceof Servico) {
            quantosServicos++;
        }
    }

    return {
        quantosProdutos: quantosProdutos,
        quantosServicos: quantosServicos
    };
}

function impostoMedioVeiculos(taxaveis) {
    validate(arguments, ["Array"]);

    let somaImpostos = 0;
    let quantidadeVeiculos = 0;

    for (let t of taxaveis) {
        if (t instanceof Veiculo) {
            somaImpostos += t.valorImposto;
            quantidadeVeiculos++;
        }
    }

    return {
        impostoMedio: quantidadeVeiculos > 0
            ? somaImpostos / quantidadeVeiculos
            : 0
    };
}

function quantidadeTransportaveis(entregaveis) {
    validate(arguments, ["Array"]);

    let quantosTransportaveis = 0;

    for (let e of entregaveis) {
        if (isTransportavel(e)) {
            quantosTransportaveis++;
        }
    }

    return {
        quantosTransportaveis: quantosTransportaveis
    };
}

function valorFreteTotal(transportaveis) {
    validate(arguments, ["Array"]);

    let valorTotal = 0;

    for (let e of transportaveis) {
        if (isTransportavel(e)) {
            valorTotal += e.valorFrete;
        }
    }

    return {
        valorTotal: valorTotal
    };
}

let ps = [];
ps.push(new Produto(1, "Banana", 7.50, false, 5));
ps.push(new Produto(2, "Maçã", 5.00, false, 4));
ps.push(new ServicoVoluntario(3, "Aula de Matemática", "João"));
ps.push(new Servico(105, "Consultoria", 300));
ps.push(new Veiculo("ABC1234", 2020, 50000));

console.log("\nPrimeira lista:");
console.log(quantidadeProdutosServicos(ps));
console.log(impostoMedioVeiculos(ps));

let first = [];
first.push(new Produto(4, "Banana", 10, true, 8));
first.push(new Produto(5, "Maçã", 7.0, false, 5));
first.push(new ServicoVoluntario(6, "Aula de Português", "Bruno"));
first.push(new Servico(106, "Aluguel", 1200));
first.push(new Veiculo("ACB1324", 2026, 500000));

console.log("\nSegunda lista:");
console.log(quantidadeTransportaveis(first));

let produtos = [];
produtos.push(new Produto(7, "Banana", 6.0, false, 3));
produtos.push(new Produto(8, "Maçã", 4.5, false, 2));
produtos.push(new Produto(9, "Ovelha", 2000, true, 50));
produtos.push(new Produto(10, "Vaca", 4500, false, 100));
produtos.push(new ServicoVoluntario(11, "Aula de Anatomia", "Bernardo"));
produtos.push(new Servico(107, "Aluguel", 800));
produtos.push(new Veiculo("CAB1342", 2000, 12000));

console.log("\nTerceira lista:");
console.log(valorFreteTotal(produtos));