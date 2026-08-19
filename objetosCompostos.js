const promptsync = require("prompt-sync");
const prompt = promptsync({ sigint: true });
const { validate } = require('bycontract');

class Turma{
    #numero;
    #professor;
    #alunos;
    #quantidadeAlunos;

    constructor(numeroTurma,nomeProfessor,vagas){
        validate(arguments,["Number","String","Number"]);
        if(numeroTurma<=0 || nomeProfessor.lenght == 0 || vagas == 0){
            this.#numero = -1;
        }
        this.#numero = numeroTurma;
        this.#professor = nomeProfessor;
        this.#alunos = new Array(vagas);
        this.#quantidadeAlunos = 0;
    }
}

let turma1 = new Turma(10,'Bruno Poltosi',20);
