const { validate } = require("bycontract");

class Funcionario{
    #nome;
    #salarioBase;

    constructor(nome,salarioBase){
        validate(arguments,["string","number"]);
        this.#nome = nome;
        this.#salarioBase = salarioBase;
    }

    get nome(){
        return this.#nome;
    }
    get salarioBase(){
        return this.#salarioBase;
    }   
    get salarioLiquido(){
        return this.#salarioBase;
    }
    toString(){
        return `\nFuncionario: ${this.nome}\nSalario Base: ${this.salarioBase.toFixed(2)}\nSalario Liquido: ${this.salarioLiquido.toFixed(2)}`;
    }
}

class Tecnico extends Funcionario{
    #categoria;

    constructor(nome,salarioBase,categoria){
        validate(arguments,["string","number","string"]);
        super(nome,salarioBase);
        this.#categoria = categoria;
    }

    get categoria(){
        return this.#categoria;
    }
    get salarioLiquido(){
        let salario = this.salarioBase;
        if(this.categoria > 3){
            salario *= 1.03;
        }
        return salario;
    }
}

class Professor extends Funcionario{
    #cargaHorariaMensal;

    constructor(nome,salarioBase,cargaHoraria){
        validate(arguments,["string","number","number"]);
        super(nome,salarioBase);
        this.#cargaHorariaMensal = cargaHoraria;
    }

    get cargaHorariaMensal(){
        return this.#cargaHorariaMensal;
    }
    set cargaHorariaMensal(valor){
        validate(arguments,["number"]);
        this.#cargaHorariaMensal = (valor>0)?valor:0;
    }

    get salarioLiquido(){
        let valHora = this.salarioBase/44;
        let salarioTotal = valHora * this.cargaHorariaMensal;
        let inss = salarioTotal * 0.1;
        let salario = salarioTotal - inss;
        return salario;
    }

    toString(){
        return super.toString() + `\nCarga Horaria Mensal: ${this.cargaHorariaMensal}`;
    }
}

class Pesquisador extends Professor{
    #cargaHorariaPesquisa;
    
    constructor(nome,salarioBase,cargaHoraria,cargaHorariaPesquisa){
        validate(arguments,["string","number","number","number"]);
        super(nome,salarioBase,cargaHoraria);
        this.#cargaHorariaPesquisa = cargaHorariaPesquisa;
    }
    get cargaHorariaPesquisa(){
        return this.#cargaHorariaPesquisa;
    }
    set cargaHorariaPesquisa(valor){
        validate(arguments,["number"]);
        this.#cargaHorariaPesquisa = (valor>0)?valor:0;
    }
    get cargaHorariaMensal(){
        return super.cargaHorariaMensal + this.cargaHorariaPesquisa;
    }
}

function acrescentaHoras(funcionario){
    validate(funcionario,Funcionario);
    if(funcionario instanceof Pesquisador){
        funcionario.cargaHorariaPesquisa += 3;
    } else{
        if(funcionario instanceof Professor){
        funcionario.cargaHorariaMensal += 5;
        }
    }
}

let professor1 = new Professor("Joao",2000,40);
console.log(professor1.toString());
acrescentaHoras(professor1);

let pesquisador1 = new Pesquisador("Maria",2000,40,10);
console.log(pesquisador1.toString());
acrescentaHoras(pesquisador1);

let tecnico1 = new Tecnico("Jose",2000,"3");
console.log(tecnico1.toString());
acrescentaHoras(tecnico1);