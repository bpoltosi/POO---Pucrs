import promptSync from "prompt-sync";
const prompt = promptSync();

function fatorial(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("Valor inválido");
    }
    let resultado = 1;
    for (let i = 1; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}

let x = Number(prompt("Digite um valor: "));
let y = 0;

try {
    y = 5 * fatorial(x);
    console.log(y);
} catch (erro) {
    console.log(erro.message);
    process.exit(1);
}

console.log("fim");