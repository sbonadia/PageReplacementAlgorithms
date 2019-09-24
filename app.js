const fs = require('fs');
const Readers = require("./libs/readers");
const Cache = require("./libs/cache");
const Mapping = require("./libs/mapping");

console.log("\n");
console.log("############################################################################");
console.log("## Simulador de algoritmos de substituição de página de memória em cache. ##");
console.log("############################################################################\n");

//const App = require('./initializer');
const prompt = require("prompt");
//const readers  = App.Readers;
const readers = new Readers();
var cache_size = 0;
var map_type = "";
var method = "";
var error = -1;

if(readers.get_path() != -1) {
    console.log(`Nome do arquivo de testes: ${ readers.get_path()}`);
} else {
    error++;
}
if(readers.get_cache_size() != -1) {
    cache_size = readers.get_cache_size();
    console.log(`tamanho da memória: ${ cache_size }`)
} else {
    error++;
}
if(readers.get_mapping() != -1) {
    map_type = readers.get_mapping();
    console.log(`Mapeamento: ${ map_type }`)
} else {
    error++;
}
if(map_type != "DIRECT") {
    if(readers.get_method() != -1) {
        method = readers.get_method();
        console.log(`Método utilizado: ${ method }`);
    } else {
        error++;
    }
}
console.log("\n");
if( error < 0 ){
    fs.readFile(readers.get_path(),"utf8",function(err, contents){
        if(!err) {
            var str = "";
            var mem_refs = contents.replace(/\r/g,"").split("\n");
            mem_refs.forEach((el, i) => {
                str += el.replace("\r","") + ",";
            });
            str = str.slice(0, -1);
            console.log(`Registros de testes: ${ str }`)
            var cache = new Cache( cache_size );
            if(map_type == "DIRECT") {
                mapping = new Mapping.MappingDirect(cache);
            } else if ("ASSOCIATIVE") {
                mapping = new Mapping.MappingAssociative(cache, method);                
            } else if ("ASSOCIATIVE_SET") {
                mapping = new Mapping.MappingAssociativeSet(cache, method);                
            }
            mapping.run(mem_refs);
        } else {
            console.error("arquivo não encontrado.");
        }
            
    })
} else {
    console.log("Não foi possível executar o simulador.")
}
