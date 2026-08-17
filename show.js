const promptsync = require('prompt-sync');
const prompt = promptsync({sigint: true});

console.log("Categorias:\n 1: Geral\n 2:Convidado\n 3: Idoso\n 4: Funcionário\n 5: Funcionário Idoso\n 6: Criança");

let valorIngresso = 500.00;
let resposta = Number(prompt("Qual sua categoria? "));
let x = resposta;
let desconto = 0;
switch(x){
    case 1:
        desconto = 1;
        break;
    case 2:
        desconto = 0.75;
        break;
    case 3:
        desconto = 0.5;
        break;
    case 4:
        desconto = 0.5;
        break;
    case 5:
        desconto = 0.5 * valorFuncionario;
        break;
    case 6:
        desconto = 0;
        break;
    default:
        desconto = NaN;
}
let preco = valorIngresso * desconto;
if (!isNaN(preco)){
    console.log(`Valor a ser pago: R$${preco.toFixed(2)}, desconto de ${1-desconto}% `);
}else{
    console.log("categoria inválida!");
}