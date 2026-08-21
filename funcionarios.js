const { validate } = require("bycontract");

class Funcionario {
    #nome;
    #salarioBase;

    constructor(nome, salarioBase) {
        validate(arguments, ["string", "number"]);
        this.#nome = nome;
        this.#salarioBase = salarioBase;
    }

    get nome() {
        return this.#nome;
    }

    get salarioBase() {
        return this.#salarioBase;
    }

    get salarioLiquido() {
        return this.#salarioBase;
    }

    get tipoFuncionario() {
        return "Funcionario";
    }

    toString() {
        return `\nTipo: ${this.tipoFuncionario}\nFuncionario: ${this.nome}\nSalario Base: ${this.salarioBase.toFixed(2)}\nSalario Liquido: ${this.salarioLiquido.toFixed(2)}`;
    }
}

class Tecnico extends Funcionario {                             //tecnico herda de Funcionario
    #categoria;

    constructor(nome, salarioBase, categoria) {
        validate(arguments, ["string", "number", "string"]);
        super(nome, salarioBase);
        this.#categoria = categoria;
    }

    get categoria() {
        return this.#categoria;
    }

    get tipoFuncionario() {
        return "Tecnico";
    }

    get salarioLiquido() {
        let salario = this.salarioBase;

        if (Number(this.categoria) > 3) {
            salario *= 1.03;
        }

        return salario;
    }

    toString() {
        return super.toString() + `\nCategoria: ${this.categoria}`;
    }
}

class Professor extends Funcionario {                       //professor herda de Funcionario
    #cargaHorariaMensal;

    constructor(nome, salarioBase, cargaHoraria) {
        validate(arguments, ["string", "number", "number"]);
        super(nome, salarioBase);
        this.#cargaHorariaMensal = cargaHoraria;
    }

    get cargaHorariaMensal() {
        return this.#cargaHorariaMensal;
    }

    set cargaHorariaMensal(valor) {
        validate(arguments, ["number"]);
        this.#cargaHorariaMensal = valor > 0 ? valor : 0;
    }

    get tipoFuncionario() {
        return "Professor";
    }

    get salarioLiquido() {
        let valHora = this.salarioBase / 44;
        let salarioTotal = valHora * this.cargaHorariaMensal;
        let inss = salarioTotal * 0.1;
        return salarioTotal - inss;
    }

    toString() {
        return super.toString() + `\nCarga Horaria Mensal: ${this.cargaHorariaMensal}`;
    }
}

class Pesquisador extends Professor {               //pesquisador herda de Professor que herda de Funcionario
    #cargaHorariaPesquisa;

    constructor(dados) {
        validate(arguments, [{
            nome: "string",
            salarioBase: "number",
            cargaHoraria: "number",
            cargaHorariaPesquisa: "number"
        }]);

        super(dados.nome, dados.salarioBase, dados.cargaHoraria);
        this.#cargaHorariaPesquisa = dados.cargaHorariaPesquisa;
    }

    get cargaHorariaPesquisa() {
        return this.#cargaHorariaPesquisa;
    }

    set cargaHorariaPesquisa(valor) {
        validate(arguments, ["number"]);
        this.#cargaHorariaPesquisa = valor > 0 ? valor : 0;
    }

    get cargaHorariaMensal() {
        return super.cargaHorariaMensal + this.cargaHorariaPesquisa;
    }

    get tipoFuncionario() {
        return "Pesquisador";
    }

    toString() {
        return super.toString() + `\nCarga Horaria de Pesquisa: ${this.cargaHorariaPesquisa}`;
    }
}

function acrescentaHoras(funcionario) {
    validate(arguments, [Funcionario]);

    if (funcionario instanceof Pesquisador) {
        funcionario.cargaHorariaPesquisa += 3;
    } else if (funcionario instanceof Professor) {
        funcionario.cargaHorariaMensal += 5;
    }
}

let professor1 = new Professor("Joao", 2000, 40);             //cria professor1
console.log(professor1.toString());
acrescentaHoras(professor1);

let p1 = {                                                    //cria objeto p1 com os dados do pesquisador
    nome: "Maria",
    salarioBase: 2000,
    cargaHoraria: 40,
    cargaHorariaPesquisa: 10
};

let pesquisador1 = new Pesquisador(p1);                       //cria pesquisador1 com os dados do objeto p1
console.log(pesquisador1.toString());
acrescentaHoras(pesquisador1);

let tecnico1 = new Tecnico("Jose", 2000, "3");                //cria tecnico1
console.log(tecnico1.toString());
acrescentaHoras(tecnico1);