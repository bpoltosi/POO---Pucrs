export class Queue{
    #base;

    constructor(){
        this.#base = [];
    }

    enqueue(valor){
        this.#base.push(valor);
    }

    dequeue(valor){
        if(this.isEmpty()){
            throw new Error("Queue empty!");
        }
        return this.#base.splice(0,1)[0];
    }

    isEmpty(){
        return this.size === 0;
    }


    get size(){
        return this.#base.length;
    }

    get first(){
        if(this.isEmpty()){
            throw new Error("Queue empty!");
        }
        return this.#base[0];
    }
    
        get last(){
        if(this.isEmpty()){
            throw new Error("Queue empty!");
        }
        return this.#base[this.size-1];
    }
}