class LRU {
    constructor(cache){
        this.cache = cache;
        this.hits = 0;
        this.misses = 0;
    }
    add(ref, key){
        var resp = ``;
        resp += `posição de entrada \t< ${ ref } >`;
        if(this.cache.positions.indexOf(ref) > -1){
            this.hits ++;
            this.cache.positions.splice(this.cache.positions.indexOf(ref),1); // remove from middle
            this.cache.positions.unshift(ref); // put Recently Used on the top of stack
            resp += ` <------ hit`;
        } else {
            if(this.cache.positions.indexOf("empty") > -1){
                this.cache.positions.unshift(ref);
                this.cache.positions.pop();
                resp += ` <------ compulsory miss`;
            } else {
                let lastIndex = this.cache.positions.length-1;
                resp += ` <------ miss`;
                resp += `\nposição mais antiga acessada: \t${ lastIndex }` ;
                resp += `\nposição na cache \t< ${ this.cache.positions[lastIndex] } >`;
                this.cache.positions[lastIndex] = ref;
                this.cache.positions.unshift(ref); // insert on the top of stack
                this.cache.positions.pop(); // remove the last of stack
            }
            this.misses ++;
        }
        return resp;
    }
}
module.exports = LRU;