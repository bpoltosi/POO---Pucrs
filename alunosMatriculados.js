function implementaRelacoes(d1,d2,d3){

    //matriculados em D1, D2 e D3
    let todos = new Set([...d1, ...d2, ...d3]);
    console.log("\nTodos alunos matriculados em alguma turma: ");
    console.log(todos);

    //matriculados apenas em D1
    let D1 = new Set(d1);
    let D2 = new Set(d2);
    let D3 = new Set(d3);

    let D1menosD2 = new Set(Array.from(D1).filter(x => !D2.has(x)));
    let D1menosD2menosD3 = new Set(Array.from(D1menosD2).filter(x => !D3.has(x)));

    console.log('\nMatriculados so em D1: ');
    console.log(D1menosD2menosD3);

    let interseccaoD1D2 = new Set(Array.from(D1).filter(x => D2.has(x)));

    //matriculados em D1 e D2
    console.log("\nMatriculados simultaneamente em D1 e D2: ");
    console.log(interseccaoD1D2);
}

let alunosD1 = ['jorge','luis','marcia','janete','carla','rafael','melina'];
let alunosD2 = ['luis','marcia','marcelo','janete','mariana','carla','rafael'];
let alunosD3 = ['luis','marcia','janete','mariana'];

implementaRelacoes(alunosD1,alunosD2,alunosD3);