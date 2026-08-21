import { validate, typedef } from "bycontract";
import nReadlines from "n-readlines";
import * as Carros from "./hierarquiaElementosTrem.js";

export class Garagem{
    #carros;

    constructor(narq){
        validate(narq,"string");
        this.#carros = [];
        this.carregadados(narq);
    }

    carregadados(narq){
        validate(narq,"string");
        let arquivo = new nReadlines(narq);
        let buf = "";
        let linha = "";
        let dados = "";

        arquivo.next();                    //pula a primeria linha

        while(buf = arquivo.next()){        //le as linhas seguintes ate acabar
            linha = buf.toString('utf8');
            dados = linha.split(",");

            let id = Number(parseInt(dados[0]));
            let tipo = dados[1];
            let potencia = Number(parseInt(dados[2]));
            let capacidadeCarga = Number(parseInt(dados[3]));
            let quantidadeDePassageiros = Number(parseInt(dados[4]));
            let temperaturaMinima = Number(parseInt(dados[5]));
            let valorLocacao = Number(parseInt(dados[6]));


            //arranjo polimorfico -- armazena os tipos de veiculos
            switch(tipo){
                case 'LO':
                    let locomotiva = new Carros.Locomotiva(id,potencia);
                    this.#carros.push(locomotiva);
                    break;
                case 'VC':
                    let vagaoCarga = new Carros.VagaoCarga(id,capacidadeCarga);
                    this.#carros.push(vagaoCarga);
                    break;
                case 'VP':
                    let vagaoPassageiros = new Carros.VagaoPassageiros(id,quantidadeDePassageiros);
                    this.#carros.push(vagaoPassageiros);
                    break
                case 'VR':
                    let vagaoResfriado = new Carros.VagaoCargaRefrigerado(id,capacidadeCarga,temperaturaMinima);
                    this.#carros.push(vagaoResfriado);
                    break;
                case 'VL':
                    let vagaoLocacao = new Carros.VagaoPassageiroLocavel(id,quantidadeDePassageiros,temperaturaMinima,valorLocacao);
                    this.#carros.push(vagaoLocacao);
                    break;
                default:
                    throw new Error(`Elemento inválido! ${tipo}`);
            }
        }
    }

    get carrosNaGaragem(){
        return this.#carros.values();
    }

    entra(carro){
        validate(carro, Carros.Carro);
        this.#carros.push(carro);
    }
    retira(id){
        validate(id,"number");
        let v = undefined;

        if(this.#carros.length > 0){
            for(let i=0; i<this.#carros.length; i++){
                if(this.#carros[i].id === id){
                    v = this.#carros.splice(i,1)[0];
                    break;
                }
            }
        }  
        return v;
    }
}

export class Trem{
    #carros;

    constructor(locomotiva){
        validate(locomotiva, Carros.Locomotiva);
        this.#carros = [];
        this.#carros.push(locomotiva);
    }

    get carrosNoTrem(){
        return this.#carros.values();
    }

    potenciaRestante(){
        //consome 100HP para 2 VAGOES
        let potencia = ((this.#carros[0].potencia / 100)*2);

        for(let v of this.#carros.slice(1)){
            if(Carros.isRefrigerado(v)){
                potencia -= 2;
            } else {
                potencia --;
            }
        }
        return potencia;
    }

    quantidadeLocaveis(){
        let quantidadeLocavel=0;
        for(let v of this.#carros){
            if(Carros.isLocavel(v)){
                quantidadeLocavel++;
            }
        }
        return quantidadeLocavel;
    }

    engata(carro){
        validate(carro, Carros.Carro);
        //nao pode engatar locomotiva
        if(carro instanceof Carros.Locomotiva) throw new Error("Nao pode engatar outra locomotiva!");

        let potencia = this.potenciaRestante();
        if(potencia === 0) throw new Error("Capacidade da locomotiva esgotada (sem mais potencia)");
        if(Carros.isRefrigerado(carro)){
            if (potencia < 2) throw new Error("Capacidade da locomotiva insuficiente para agregar vagao refrigerado");
        }

        //verifica se nao esta inserindo passageiro depois de uma carga
        let ultimo = this.#carros[(this.#carros.length - 1)];
        if(carro instanceof Carros.VagaoPassageiros && ultimo instanceof Carros.VagaoCarga){
            throw new Error("Nao pode engatar vagao de passageiro atras de vagao de carga!");
        }

        //verifica se nao ha mais de dois locaveis
        if (this.quantidadeLocaveis() >= 2 && Carros.isLocavel(carro)) throw new Error("Maximo de 2 locaveis por trem excedidos!");
        
        //se pode engatar, por final executa
        this.#carros.push(carro);
    }

    desengata(carro){
        //nao pode retirar locomotiva
        if(this.#carros.length <= 1) throw new Error("Nao pode desengatar a locomotiva!");
        let i = this.#carros.length - 1;

        return this.#carros.splice(i,1)[0];
    }

    static decodificarCarro(carro){
        if (carro instanceof Carros.VagaoPassageiroLocavel) return 'VL';
        if (carro instanceof Carros.VagaoCargaRefrigerado) return 'VR';
        if (carro instanceof Carros.VagaoPassageiros) return 'VP';
        if (carro instanceof Carros.VagaoCarga) return 'VC';
        if (carro instanceof Carros.Locomotiva) return 'LO';
        return undefined;
    }

    toString(){
        let str = "";
        for(let carro of this.#carros){
            str += `[${Trem.decodificarCarro(carro)}: ${carro.id}]`;
        }
        return str;
    }
}