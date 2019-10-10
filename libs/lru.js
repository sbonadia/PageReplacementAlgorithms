class LRU {
    constructor(cache){
        this.cache = cache;
        this.hits = 0;
        this.misses = 0;
    }
    add(ref, positions){
        var resp = ``;
        resp += `posição de entrada \t< ${ ref } >`;
        if(positions.indexOf(ref) > -1){
            this.hits ++;
            positions.splice(positions.indexOf(ref),1); // remove from middle
            positions.unshift(ref); // put Recently Used on the top of stack
            resp += ` <------ hit`;
        } else {
            if(positions.indexOf("empty") > -1){
                positions.unshift(ref);
                positions.pop();
                resp += ` <------ compulsory miss`;
            } else {
                let lastIndex = positions.length-1;
                resp += ` <------ miss`;
                resp += `\nposição mais antiga acessada: \t< ${ positions[lastIndex] } >` ;
                //resp += `\nposição na cache \t< ${ positions[lastIndex] } >`;
                positions[lastIndex] = ref;
                positions.unshift(ref); // insert on the top of stack
                positions.pop(); // remove the last of stack
            }
            this.misses ++;
        }
        return resp;
    }
}
module.exports = LRU;