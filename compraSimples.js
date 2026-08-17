const promptsync = require('prompt-sync');
const prompt = promptsync({sigint: true});

const valorSuco = 5.2;
const valorSanduiche = 12;

let resposta = prompt("Quantos copos de suco voce deseja? ")
let qtdSuco = parseInt(resposta);
let custoSuco = qtdSuco * valorSuco;
if (qtdSuco>10){
    custoSuco = custoSuco * 0.8;
} 
resposta = prompt("Quantos sanduiches voce quer? ");
let qtdSanduiche = parseInt(resposta);
let custoSanduiche = qtdSanduiche * valorSanduiche;
if (qtdSanduiche>10){
    custoSanduiche = custoSanduiche * 0.8;
}
let custoTotal = custoSanduiche + custoSuco;

console.log("\nRecibo da Compra:\n");
console.log(`Suco: \n valor unitário: R$${valorSuco.toFixed(2)}, quantidade: ${qtdSuco}, preço: R$${custoSuco.toFixed(2)}\n`);
if (qtdSuco>10){
    console.log("Foi aplicado um desconto de 20% ao produto!\n");
}
console.log(`Sanduiche: \n valor unitário: R$${valorSanduiche.toFixed(2)}, quantidade: ${qtdSanduiche}, preço: R$${custoSanduiche.toFixed(2)}\n`);
if (qtdSanduiche>10){
    console.log("Foi aplicado um desconto de 20% ao produto!\n");
}
console.log(`Custo total da compra: R$${custoTotal.toFixed(2)}`);

//posso calcular (custo-desconto) para conseguir exibir o valor do desconto