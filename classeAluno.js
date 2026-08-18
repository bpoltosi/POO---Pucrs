/* Validação de propriedades obrigatorias(nome e matricula),
calculo de media entre P1 e P2, tratamento de erros */
const promptsync = require("prompt-sync");
const prompt = promptsync({ sigint: true });
const { validate } = require('bycontract');

class Aluno{
    matricula;
    nome;
    notaP1;
    notaP2;


    constructor (matricula,nome){

        validate(arguments,["Number","String"]);
        if (matricula<1000 || matricula>9999){
            matricula = -1;
        }
        if (nome.lenght == 0){
            nome = 'none';
        }

        this.matricula = matricula;
        this.nome = nome;
        this.notaP1 = -1;
        this.notaP2 = -1;
    }

    media(){
        if (this.notaP1 === -1.0 || this.notaP2 === -1.0){
            return NaN;
        }else{
            return (this.notaP1 + this.notaP2)/2;
        }
    }

    aprovado(){
        return this.media()>=7.0;
    }

    toString(){
        let str = "";
        if(this.matricula === -1 || this.nome === 'none'){
            str = 'Dados inválidos!';
        }else{
            str = `Matrícula do Aluno: ${this.matricula}\nNome do Aluno: ${this.nome}\n`;
            if(this.notaP1 === -1.0 || this.notaP2 === -1.0){
                str += 'Notas não disponíveis!';
            }else{
                str += `Prova 1 = ${this.notaP1} e Prova 2 = ${this.notaP2}\n`;
                str += `Media da P1 e P2: ${this.media()}\nSituação: `;
                if(this.aprovado()){
                    str += 'aprovado';
                }else{
                    str += 'reprovado';
                }
            }
        } 
        str += '\n'
        return str;
    } 
}

let a1 = new Aluno(2929,'Bruno Poltosi');
let a2 = new Aluno(2222,'Lilian Saldanha');
a2.notaP1 = 10;

let a3 = new Aluno(1212,'Beatriz Saldanha');
a3.notaP1 = 10;
a3.notaP2 = 9;

console.log(a1.toString());
console.log(a2.toString());
console.log(a3.toString());
