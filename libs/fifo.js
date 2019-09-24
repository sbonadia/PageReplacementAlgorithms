class Fifo {
    constructor(cache){
        this.cache = cache;
        this.first_index = 0;
        this.hits =0;
        this.misses = 0;
    }
    add(ref, key){
        if(this.cache.cache.indexOf(ref)>0){
            this.hits ++;
        } else {
            if(this.cache.cache[key%this.cache.cache_size] == "empty"){
                this.cache.cache[key%this.cache.cache_size] = ref;
            } else {
                this.cache.cache[this.first_index] = ref
                this.first_index = (this.first_index + 1) % this.cache.cache_size;
            }
            this.misses ++;
        }
    }
    
}
module.exports = Fifo;