export class Stack{
    #base;

    constructor(){
        this.#base = [];
    }

    push(valor){
        this.#base.push(valor);
    }

    pop(valor){
        if(this.isEmpty()){
            throw new Error("Stack empty!");
        }
        return this.#base.pop;
    }

    isEmpty(){
        return this.size === 0;
    }

    get size(){
        return this.#base.length;
    }

    get top(){
        if(this.isEmpty()){
            throw new Error("Stack empty!");
        }
        return this.#base[this.size-1];
    }
}