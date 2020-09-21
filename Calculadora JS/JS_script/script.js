const sinais = ["X","/","-","+"];

function ultimoElemento(elemento){
    return elemento[elemento.length-1];

}

function removerCaractere(caixaTexto){
    caixaTexto.value = caixaTexto.value.slice(0,(caixaTexto.value.length - 1));

}

function verificarOp(sinais = [], elemento){
    //percorre o array em busca dos sinais especificados

    for (let i = 0; i < sinais.length; i++) {
         if(sinais[i] === elemento){
            return true;
         }
    }
    return false;
}

function validacaoNum(conteudo){
    //verifica se e um sinal ou numero

    if(verificarOp(sinais,conteudo) || 
    (!(isNaN(conteudo)) && conteudo !== " "))
    {
        return true;

    }else {
        return false;
    }
}

function validacaoRepeticao(caixaTexto, conteudo, num){
    //verifica se o array percorrido tem um sinal, e se o input tem um sinal, e caso tenha, retorna true
    if(!(verificarOp(["/","+","-","X","."], caixaTexto.value.charAt(caixaTexto.value.length - num))
            && verificarOp(["/","+","-","X","."], conteudo))){
                return true;

            }else {
                return false;
            }
}

function calculo(operacao, numero1, numero2){

    switch(operacao){
        case "X":
            return numero1 * numero2;
            break;
            
        case "/":
            return numero1/numero2;
            break;
        case "-":
            return numero1-numero2;
            break;
        case "+":
            return numero1+numero2;
            break;
    }        
}


function organizarCalculo(caixaTexto){
    if(caixaTexto.value === ""){
        alert("Preencha a caixa de calculo!")
        //aqui separa os numeros e as operacoes para calculo
    } else {
        let operacao = [];
        let posicao_apos_operacao = 0;
        //comeca em 1 pois o usuario pode ter posto um sinal no inicio

        for(let i = 1; i<caixaTexto.value.length; i++){

           //lê o array até encontrar um sinal, e então pega todo
           //o valor escrito antes dele e insere em operação

            if(verificarOp(sinais, caixaTexto.value.charAt(i))){

                operacao.push(caixaTexto.value.slice(posicao_apos_operacao, i));

                operacao.push(caixaTexto.value.charAt(i))
                
                //para que, quando fizer um novo slice, não acrescentar a ocorrencia da
                //operacao junto
                
                posicao_apos_operacao = i+1;
            }
        }
        // no fim do for, pega todo conteudo depois da ultima ocorrencia de um sinal
        // ate o fim do conteudo da caixa de texto e insere na operacao
        operacao.push(caixaTexto.value.slice(posicao_apos_operacao, caixaTexto.value.length)) 


        //verifica todo o array operacao por sinais na ordem de precendencia, e quando encontra,
        //
        for(let i = 0; i < sinais.length; i++){
            for(let k = 0; k < operacao.length; k++){
                if(sinais[i] === operacao[k]){
                   // alert(operacao.length)
                   //alert("Operacao antes: " + operacao)
                   //
                   operacao.splice(k-1,3,calculo(sinais[i], Number(operacao[k-1]), Number(operacao[k+1]))) 
                  // alert("Operacao depois: " + operacao)
                   k=0;
                }

            }
        }
        caixaTexto.value = operacao[0]

    } 
}

function substituirCaractere(caixaTexto, conteudo, num){
    //para se substituir o caractere
    caixaTexto.value = caixaTexto.value.slice(0, caixaTexto.value.length - num) + conteudo;
}

function inserir(caixaTexto = "", conteudo = ""){
    //para caso a chamada da funcao tenha sido feita via input
    if(caixaTexto === ""|| conteudo === ""){

        caixaTexto =  document.getElementById("idinputnumber");
        conteudo = caixaTexto.value.charAt(caixaTexto.value.length -1);

        
        //como no momento do input, o caractere que e acrescentado fica na ultima posicao, deve se 
        //comparar com o caractere da penultima posicao,por isso o 2

        if(validacaoRepeticao(caixaTexto, conteudo, 2)){

            //Como num input o caractere ja e colocado, nao ha necessidade de coloca-lo,
            //sendo apenas necessario retira-lo caso ele nao passe pela validacao

            if(!validacaoNum(conteudo) || (caixaTexto.value.length === 1 && verificarOp(["X","/"], conteudo))){
                removerCaractere(caixaTexto);
                if(conteudo === "="){
                    organizarCalculo(caixaTexto);
                    
        
                }
                

            }
        }else if(caixaTexto !== ""){

            //Se a caixa de texto nao for vazia, e tiver um input de operacao na primeira posicao
            //e o segundo for X ou /, ao inves de substituir como a operacao, ele impedira o input

            if(caixaTexto.value.length === 2 && verificarOp(["X","/"], conteudo)){
                removerCaractere(caixaTexto);
            }else {
            //aqui se retira o caractere colocado e o antes dele, subtituindo o anterior pelo o do input
            substituirCaractere(caixaTexto, conteudo, 2);

            }
        }

    }else {
    
    //se houver um cacactere de operacao no ultimo espaco da caixa
    //e o botao que for clicado for de operacao, ele não executara a proxima linha
                
        if(validacaoRepeticao(caixaTexto, conteudo, 1)) {

                if(validacaoNum(conteudo)) {
                    if(!(caixaTexto.value.length === 0 && verificarOp(["X","/"], conteudo))) {

                    caixaTexto.value += conteudo;

                    }
                }
                   //mesma ideia do anterior, so que dessa vez como nao ha input, ele substitui o ultimo
                   //como não ha input pelo teclado, é só não executar essa linha de codigo se
                   //a operacao for X ou /
            }else if(caixaTexto !== "" && !(verificarOp(["X","/"], conteudo))) {
                substituirCaractere(caixaTexto, conteudo, 1);

        }
    }
}

function acionarBotao(e){
    //verificar se o click foi em um botao
    if(e.target.className === "botao") {

        let caixaTexto = document.getElementById("idinputnumber");
        let conteudo = e.target.textContent; 

        switch(conteudo) {
            //deletar os conteudo da caixa
            case "CE": caixaTexto.value = ""; 
                break;
            //deletar o ultimo caractere
            case "DEL": caixaTexto.value = caixaTexto.value.slice(0,caixaTexto.value.length -1);

                break;
            //executar o calculo
            case "=":
                    organizarCalculo(caixaTexto)

                 break;
            //qualquer outro botao é inserido
            default:
                inserir(caixaTexto, conteudo)
                
                break;
        }
       

    }
}

document.getElementById("areabotoes").addEventListener("click", acionarBotao);
document.getElementById("idinputnumber").addEventListener("input", inserir);


