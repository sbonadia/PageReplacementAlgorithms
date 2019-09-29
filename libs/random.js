class Random {
    constructor(cache){
        this.cache = cache;
        this.hits =0;
        this.misses = 0;
        this.seed = 0;
        this.rnd = Math.floor(Math.random()*this.cache.size);
    }
    add(ref, key){
        var resp = ``;
        resp += `posição de entrada \t< ${ ref } >`;
        if(this.cache.positions.indexOf(ref) > -1){
            this.hits ++;
            resp += ` <------ hit`;
        } else {
            if(this.cache.positions.indexOf("empty") > -1){
                resp += `\nposição na cache \t< ${ ref } >`;
                this.cache.positions[this.cache.positions.indexOf("empty")] = ref;
                resp += ` <------ compulsory miss`;
            } else {
                this.rnd = Math.floor(Math.random()*this.cache.size);
                resp += ` <------ miss`;
                resp += `\nposição aleatória: \t${ this.rnd }` ;
                resp += `\nposição na cache \t< ${ this.cache.positions[this.rnd] } >`;
                this.cache.positions[this.rnd] = ref;
            }
            this.misses ++;
        }
        return resp;
    }
}
module.exports = Random;