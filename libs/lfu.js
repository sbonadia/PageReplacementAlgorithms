class LFU {
    constructor(cache){
        this.cache = cache;
        this.hits = 0;
        this.misses = 0;
        this.least_freq_array = new Array(this.cache.size); // auxiliar array
        for (let i = 0; i < this.cache.size; i++) {
            this.least_freq_array[i] = { 
                freq: 0,    // frequency access counter
                count: 0        // cycles counter
            };
        }
    }
    leastFrequencyUsed (){
        let min_array = this.least_freq_array.filter(n => n.freq == Math.min(...this.least_freq_array.map(d=>d.freq))); // get minimun frequency values
        return this.least_freq_array.map(d=>d.count).indexOf( Math.max(...min_array.map(d=>d.count))); // get max cycles counter
        //return this.least_freq_array.indexOf(Math.min(...this.least_freq_array)); // return de least freaquency used
    }
    add(ref, positions){
        var resp = ``;
        resp += (`\n  cont. de frequência de acesso   \n`);
        resp += (`+--------------------------------+\n`);
        resp += (`|  #cache  | #acessos | #ciclos  |\n`);
        // console.log(`+--------------------------------+`);
        for (let i = 0; i < positions.length; i++) {
            this.least_freq_array[i].count += 1; // increment all positions
            if(positions[i] == "empty") continue;
            resp += (`|        ${ positions[i] } |        ${this.least_freq_array[i].freq } |        ${this.least_freq_array[i].count } |\n`);
        }
        resp += (`+--------------------------------+\n`);

        resp += `\nEnd. de entrada: \t< ${ ref } >`;
        // console.log(`+--------------------------------+`);
        
        if(positions.indexOf(ref) > -1){
            this.hits ++;
            this.least_freq_array[positions.indexOf(ref)].freq += 1; // reset 
            this.least_freq_array[positions.indexOf(ref)].count = 0; // reset 
            resp += ` <------ hit`;
        } else {
            if(positions.indexOf("empty") > -1){
                this.least_freq_array[positions.indexOf("empty")].count = 0;
                this.least_freq_array[positions.indexOf("empty")].freq = 0;
                positions[positions.indexOf("empty")] = ref;
                resp += ` <------ compulsory miss`;
            } else {
                let old = this.leastFrequencyUsed();
                resp += ` <------ miss`;
                resp += `\nEnd. menos freq. acessado: \t< ${ positions[old] } >` ;
                //resp += `\nContador de posições: ${this.least_freq_array.map(d=>d.freq)}`
                //resp += `\nendereço na cache \t< ${ positions[old] } >`;
                this.least_freq_array[old].count = 0;
                this.least_freq_array[old].freq = 0;
                positions[old] = ref;
            }
            this.misses ++;
        }
        return resp;
    }
}
module.exports = LFU;