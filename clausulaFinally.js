function teste(valor){
    try{
        if (valor === 0){
            throw new Error('Valor = 0');
        }
        return 10/valor;
    } catch (erro){
        return 0;
    } finally{
        console.log("sempre passa por aqui")
    }
}