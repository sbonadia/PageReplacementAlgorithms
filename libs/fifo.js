class Fifo {
    constructor(cache){
        this.cache = cache;
        this.first_index = 0;
        this.hits =0;
        this.misses = 0;
    }
    add(ref, key){
        var resp = ``;
        resp += `posição de entrada \t< ${ ref } >`;
        if(this.cache.positions.indexOf(ref) > -1){
            this.hits ++;
            resp += ` <------ hit`;
        } else {
            if(this.cache.positions.indexOf("empty") > -1){
                this.cache.positions[this.cache.positions.indexOf("empty")] = ref;
                resp += ` <------ compulsory miss`;
            } else {
                resp += ` <------ miss`;
                resp += `\nposição mais antiga: \t${ this.first_index}` ;
                resp += `\nposição na cache \t< ${ this.cache.positions[this.first_index] } >`;
                this.cache.positions[this.first_index] = ref;
                this.first_index = (this.first_index + 1) % this.cache.size;
            }
            this.misses ++;
        }
        return resp;
    }
}
module.exports = Fifo;