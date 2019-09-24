
class MappingDirect {
    constructor (cache){
        this.cache  = cache;
        this.hits   = 0;
        this.misses = 0;
    }
    run (mem_refs) {
        console.log("\n##### Executando Mapemaneto Direto #####");
        mem_refs.forEach((value, key) => {
            var resp = value +" == "+ this.cache.cache[key % this.cache.cache_size];
            if(value == this.cache.cache[key % this.cache.cache_size]) {
                this.hits ++;
            } else {
                if(this.cache.cache[key % this.cache.cache_size] == "empty")
                    resp += " <-- compulsory miss";
                else
                    resp += " <-- miss";
                this.cache.cache[key % this.cache.cache_size] = value;
                this.misses ++;
            }
            console.log(resp)
            this.cache.cache[key % this.cache.cache_size]
        });
        console.log("\n##### Resultado Final #####");
        this.cache.printCache();
        console.log( `Quantidade de hits: ${this.hits}` );
        console.log( `Quantidade de misses: ${this.misses}` );
        console.log( `Taxa de acertos: ${Math.floor((this.hits / mem_refs.length)*100)/100}%` );
    }
}
class MappingAssociative {
    constructor (cache, method){
        this.method = method;
        this.cache  = cache;
        this.hits   = 0;
        this.misses = 0;
    }
    run (mem_refs) {
        console.log(`\n##### Executando Mapemaneto Associativo #####`);
        console.log(`\n##### Método ${this.method} #####`);
        var algorithm;
        if(this.method == "FIFO"){
            algorithm = new Fifo(this.cache);
        }
        mem_refs.forEach((value, key) => {
            
            algorithm.add(value, key);
            
        });
        console.log("\n##### Resultado Final #####");
        this.cache.printCache();
        console.log( `Quantidade de hits: ${algorithm.hits}` );
        console.log( `Quantidade de misses: ${algorithm.misses}` );
        console.log( `Taxa de acertos: ${Math.floor((algorithm.hits / mem_refs.length)*100)/100}%` );
    }
}
class Fifo {
    constructor(cache){
        this.cache = cache;
        this.first_index = 0;
        this.hits =0;
        this.misses = 0;
    }
    add(ref, key){
        var resp = ref +" == "+ this.cache.cache ;
        if(this.cache.cache.indexOf(ref) > -1){
            this.hits ++;
            resp += " -> hit";
        } else {
            //console.log(this.cache.cache.indexOf("empty"))
            if(this.cache.cache.indexOf("empty") > -1){
                this.cache.cache[this.cache.cache.indexOf("empty")] = ref;
                resp += " -> compulsory miss";
            } else {
                this.cache.cache[this.first_index] = ref
                this.first_index = (this.first_index + 1) % this.cache.cache_size;
                resp += " -> miss";
            }
            this.misses ++;
        }
        console.log(resp)
    }
    
}
module.exports.MappingDirect = MappingDirect;
module.exports.MappingAssociative = MappingAssociative;