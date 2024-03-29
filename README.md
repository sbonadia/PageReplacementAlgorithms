
# Simulador de algoritmos de substituição de página de memória cache.
Projeto desenvolvido para disciplina de Sistemas de Computação - UFF/2019  
Desenvolvido por: Jacó Julio e Sandro Bonadia  

# Descrição do Projeto
Construir um simulador de algoritmos de substituição de página de memória em cache. O simulador deve receber como entrada a sequência de referências às páginas de memória principal (endereços), e simular as substituições realizadas em cache após a ocorrência de um miss, para os algoritmos **FIFO**, **LRU**, **LFU** e **RANDOM**. O programa deve receber como parâmetro a capacidade total da memória cache (ou seja, número total de páginas), o esquema de mapeamento (direto, associativo e associativo por conjunto) que a cache vai operar, e o nome do arquivo de entrada a ser lido pelo programa, contendo as sequências de referências aos acessos de páginas da memória. O formato do arquivo de entrada consiste em um valor de endereço de memória (um número inteiro por linha) a ser carregado no programa. A saída do simulador deve consistir de, para cada política de substituição:
- A cada nova referência de memória do arquivo de entrada, imprimir a lista de todas as páginas armazenadas na memória cache;
- Ao final da execução, a quantidade de acerto (*hit*), a quantidade de falhas (*miss*) e a fração de acertos às referências de memória para cada política.

# Execução do Programa
Para executar o programa é necessário utilizar o comando:  
`> node app.js`  
  
Passando os parâmetros a seguir:  
`--filename [ path ]`: Parâmetro obrigatório. Recebe como parâmetro o path para o arquivo .txt com as informações de referência de memórias. Esse arquivo deverá conter um número inteiro por linha representando as referências de memória.  
`--size [ number ]`: Parâmetro obrigatório. Recebe um valor numérico representando o tamanho da memória cache.  
`--mapping [ direct | associative | associative_set ]`: Parâmetro obrigatório. Recebe como valores direct, associative ou associative_set representando o mapeamento que será aplicado ao simulador.  
`--method [ fifo | lru | lfu | random ]`: Parâmetro obrigatório caso seja optado pelo método associativo ou associativo por conjunto. Recebe como valor fifo, lru, lfu e random representando o método de substituição que será utilizado pelo simulador para em caso de miss em memória.  
`--sets [ number ]`: Parâmetro obrigatório caso seja optado pelo método associativo por conjunto. Recebe como valor um número, representando a quantidade de conjuntos que será dividida a memória.  

## Exemplos do Simulador
Para executar o simulador é necessário estar no diretório principal do programa.  
Para executar o simulador de uma memória de tamanho 4 e com mapeamento direto  
`> node app --filename teste01.txt --size 4 --mapping direct`  

Para executar o simulador de uma memória de tamanho 6, com mapeamento associativo e utilizando o método LRU  
`> node app --filename teste01.txt --size 6 --method lru --mapping associative`  

Para executar o simulador de uma memória de tamanho 4, com mapeamento associativo por conjunto com dois conjuntos e utilizando o método FIFO  
`> node app --filename teste01.txt --size 4 --method fifo --mapping associative_set --sets 2`  
