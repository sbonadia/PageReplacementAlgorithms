class LFU {
    constructor(cache){
        this.cache = cache;
        this.hits = 0;
        this.misses = 0;
        this.last_req_array = new Array(this.cache.size); // auxiliar array
        for (let i = 0; i < this.cache.size; i++) {
            this.last_req_array[i] =  -1; // default -1
        }
    }
    leastFrequencyUsed (){
        return this.last_req_array.indexOf(Math.max(...this.last_req_array)); // return de least freaquency used
    }
    add(ref, key){
        var resp = ``;
        resp += `posição de entrada \t< ${ ref } >`;
        for (let i = 0; i < this.cache.size; i++) {
            this.last_req_array[i] += 1; // increment all positions
        }
        if(this.cache.positions.indexOf(ref) > -1){
            this.hits ++;
            this.last_req_array[this.cache.positions.indexOf(ref)] = 0; // reset 
            resp += ` <------ hit`;
        } else {
            if(this.cache.positions.indexOf("empty") > -1){
                this.last_req_array[this.cache.positions.indexOf("empty")] = 0;
                this.cache.positions[this.cache.positions.indexOf("empty")] = ref;
                resp += ` <------ compulsory miss`;
            } else {
                let old = this.leastFrequencyUsed();
                resp += ` <------ miss`;
                resp += `\nposição menos freq. acessada: \t${ old }` ;
                resp += `\nContador de posições: ${this.last_req_array}`
                resp += `\nposição na cache \t< ${ this.cache.positions[old] } >`;
                this.last_req_array[old] = 0;
                this.cache.positions[old] = ref;
            }
            this.misses ++;
        }
        //console.log(` ----------------> ${ this.last_req_array }`)
        return resp;
    }
}
module.exports = LFU;