import { validate, typedef } from "bycontract";

export class Carro{
    #id;

    constructor(id){
        validate(id,"number");
        if (id <= 0){
            throw new Error(`Identificador inválido! ${id}`);
        }
        this.#id = id;
    }

    get id(){
        return this.#id;
    }

    toString(){
        let str = `id: ${this.#id}`;
        return str;
    }
}

export class Locomotiva extends Carro{
    #potencia;

    constructor(id,potencia){
        validate(id,"number");
        validate(potencia,"number");
        super(id);

        if (potencia <=0) throw new Error(`Valor de potencia inválido! ${potencia}`);
 
        this.#potencia = potencia
    }

    get potencia(){
        return this.#potencia;
    }

    toString(){
        return ('Locomotiva - '+ super.toString()+ `, potencia: ${this.#potencia}`);
    }
}

export class VagaoCarga extends Carro{
    #capacidadeCarga;

    constructor(id,capacidadeCarga){
        validate(id,"number");
        validate(capacidadeCarga,"number");
        super(id);
        
        if(capacidadeCarga <= 0) throw new Error(`Capacidade de carga inválida! ${capacidadeCarga}`);
        this.#capacidadeCarga = capacidadeCarga;
    }

    get capacidadeCarga(){
        return this.#capacidadeCarga;
    }

    toString(){
        return ('Vagao de Carga - '+ super.toString()+ `, capacidade: ${this.capacidadeCarga}`);
    }
}

export class VagaoPassageiros extends Carro {
    #quantidadePassageiros;

    constructor(id,quantidadePassageiros){
        validate(id,"number");
        validate(quantidadePassageiros,"number");
        super(id);

        if(quantidadePassageiros <=0) throw new Error(`Quantidade de passageiros inválida ${quantidadePassageiros}`);
        this.#quantidadePassageiros = quantidadePassageiros;
    }

    get quantidadePassageiros(){
        return this.#quantidadePassageiros;
    }

    toString(){
        return ('Vagao de Passageiros -'+ super.toString()+ `, passageiros: ${this.quantidadePassageiros}`);
    }
}

        //interface REFRIGERADO -- temperatura minima
typedef("#Refrigerado",
    {
        temperaturaMinima: "number"});

export function isRefrigerado(obj){
    return 'temperaturaMinima' in obj;
}

        //interface LOCAVEL -- valor locacao
typedef("#Locavel",
    {
        valorLocacao:"number"});

export function isLocavel(obj){
    return 'valorLocacao' in obj;
}

export class VagaoCargaRefrigerado extends VagaoCarga{
    #temperaturaMinima;

    constructor(id,capacidadeCarga,temperaturaMinima){
        validate([id,capacidadeCarga,temperaturaMinima],["number","number","number"]);
        super(id,capacidadeCarga);
        this.#temperaturaMinima = temperaturaMinima;
    }

            //imnplementa REFRIGERADO -- temperatura minima
    get temperaturaMinima(){
        return this.#temperaturaMinima;
    }

    toString(){
        return (super.toString()+ `, temperatura minima: ${this.temperaturaMinima}`);
    }


}

export class VagaoPassageiroLocavel extends VagaoPassageiros{
    #temperaturaMinima;
    #valorLocacao;

    constructor(id,quantidadePassageiros,temperaturaMinima,valorLocacao){
        validate([id,quantidadePassageiros,temperaturaMinima,valorLocacao],["number","number","number","number"]);
        super(id,quantidadePassageiros);

        this.#temperaturaMinima = temperaturaMinima;
        this.#valorLocacao = valorLocacao;
    }

            //imnplementa REFRIGERADO -- temperatura minima
    get temperaturaMinima(){
        return this.#temperaturaMinima;
    }

            //implementa LOCAVEL -- valor locacao
    get valorLocacao(){
        return this.#valorLocacao;
    }

    toString(){
        return (super.toString()+`, temperatura minima: ${this.temperaturaMinima}, valor locacao: ${this.valorLocacao}`);
    }
}