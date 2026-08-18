const promptsync = require('prompt-sync');
const prompt = promptsync({sigint: true});

function proxPasso(valor){
    switch(valor){
        case 0:
            return 3;
        case 3:
        case 5:
            return valor + 2;
        case 10:
            return 13;
        case 15:
            return 22;
        default:
            return valor + 1;
    }
}

let pos = -1;
let str = "";
while (pos < 22){
    pos = proxPasso(pos);
    if (pos == 8 || pos == 14) continue;
    str += pos+",";
}
pos = proxPasso(50);
str += pos;
console.log(str);