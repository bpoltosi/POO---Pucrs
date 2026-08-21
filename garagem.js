const { validate } = require("bycontract");

class Vagao{
    #id;
    #capacidadeCarga;

    static #idGen = 0;

    constructor(capacidadeCarga){
        validate(arguments,["Number"]);
        if (capacidadeCarga <= 0){
            this.#id = -1;
        } else {
            this.#capacidadeCarga = capacidadeCarga;
            Vagao.#idGen++;
            this.#id = Vagao.#idGen;
        }
    }

    get id(){
        return this.#id;
    }
    get capacidadeCarga(){
        return this.#capacidadeCarga;
    }

    toString(){
        let str = `[Vagao: ${this.#id}, Capacidade de carga: ${this.#capacidadeCarga}]`;
        return str;
    }
}

class GaragemVagoes{
    #vagoes;

    constructor(){
        this.#vagoes = [];
    }

    estaciona(vagao){
    validate(vagao,Vagao);
    if(vagao.id === -1){
        return false;
    }
    this.#vagoes.push(vagao);
    return true;
    }

    quantidade(){
        return this.#vagoes.length;
    }

    get vagoes(){
        return this.#vagoes.values();
    }

    retira(id){
        validate(id,"number");
        let v = undefined;
        if (this.quantidade() > 0){
            for(let i=0;i<this.quantidade();i++){
                if (this.#vagoes[i].id === id){
                    v = this.#vagoes.splice(i,1);
                    break;
                }
            }
        }
        return v;
    }
}

let g = new GaragemVagoes();
let v1 = new Vagao(1000);
g.estaciona(v1);
g.estaciona(new Vagao(2000));
g.estaciona(new Vagao(2000));

for(let v of g.vagoes){
    console.log(v.toString());
}

g.retira(2);
console.log("-----------")

for(let v of g.vagoes){
    console.log(v.toString());
}