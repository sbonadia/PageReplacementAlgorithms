class Cache {
    constructor(cache_size){
        this.cache_size = cache_size;
        this.cache = [];
        for(let i=0; i< this.cache_size; i++){
            this.cache.push("empty");
        }
        //console.log(`Tamanho da Cache : ${ this.cache_size}`);
        //this.printCache();
    }
    printCache(){
        console.log(`  +---------------------------------------+`);
        console.log(`  |             Memória Cache             |`);
        console.log(`  |-------------------+-------------------|`);
        console.log(`  |  #pos. na cache   | #ref. da memória  |`);
        console.log(`  |-------------------+-------------------|`);

        this.cache.forEach((value, key) => {
            var str = ``;
            let n = key.toString().length;
            for(let j=0; j< 18-n; j++){
                str+= ` `;
            }
            str += `${key} |`;
            n = value.toString().length;
            for(let j=0; j< 18-n; j++){
                str+= ` `;
            }
            str += `${value} `
            console.log(`  |${str}|`);
        
        });
        console.log(`  +-------------------+-------------------+`);

    }
    
}
module.exports = Cache;