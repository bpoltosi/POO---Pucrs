function caracterizaEquipe(equipe){
    let dados = Object.entries(equipe);
    let soma = 0;

    let [nomeMaisNovo,idadeMaisNovo] = dados[0];
    let [nomeMaisVelho,idadeMaisVelho] = dados[0];

    for(let [nome,idade] of dados){
        if(idadeMaisNovo > idade){
            nomeMaisNovo = nome;
            idadeMaisNovo = idade;
        }

        if(idadeMaisVelho < idade){
            nomeMaisVelho = nome;
            idadeMaisVelho = idade;
        }
        soma += idade;
    }

    let media = soma/dados.length;
    return {
        maisNovo:nomeMaisNovo,
        maisVelho:nomeMaisVelho,
        idadeMedia:media
    }
}

let equipe = {
    ana:18,
    sergio:15,
    bruno:19,
    carolina:16,
    flavio:17
}

let resp = caracterizaEquipe(equipe);
console.log(resp);