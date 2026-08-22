function criaContaCorrente(umNumero,umNome){
    let padrao = {saldo:0,limite:0,taxaRemuneracao:0.01};

    return{
        numero:umNumero,
        nome:umNome,
        ...padrao
    }
}

let conta = criaContaCorrente(102,'Bruno Saldanha Poltosi');
console.log(conta);