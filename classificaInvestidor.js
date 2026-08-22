function classificaInvestidor(...saldos){
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const dataHj = today.toLocaleDateString();

    let resp = {data:dataHj,categoria:'Destaque',bonus:100};

    if(saldos.length < 3){
    return resp;
    }

    let soma = 0;
    for(let s of saldos){
        soma += s;
    }

    let media = soma/saldos.length;
    if(saldos.length <= 5){
        if(media < 5000){
            return resp;
        }
        return {...resp,bonus:500};
    }   else{
        if(media < 100000){
            return {...resp,bonus:1000};
        } else {
            return {...resp,categoria:'Gold',bonus:5000};
        }
    }
}

console.log(classificaInvestidor(1000,7000));
console.log(classificaInvestidor(5000,3000,300,4000));
console.log(classificaInvestidor(8000,17000,45000,89000,23500,13000));
console.log(classificaInvestidor(180000,470000,120000,219000,720000,543000));