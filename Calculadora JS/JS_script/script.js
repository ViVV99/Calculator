document.getElementById("areabotoes").addEventListener("click", acionarBotao);
document.getElementById("idinputnumber").addEventListener("input", inserir);
let chamadaporbtn = false;

function inserir(caixaTexto = "", conteudo = ""){
	//verificacao se o input foi pela interface
   if(chamadaporbtn){
   		alert(conteudo)
   		caixaTexto.value += conteudo;
   		chamadaporbtn = false;
    }else{
    	caixaTexto = document.getElementById("idinputnumber");
    }

    let input = caixaTexto.value;

 	while(/[^-+xX./0-9]/.test(input)){
 		input = replaceOcurrence(input ,/[^-+xX./0-9]/, '');
 	}
 	caixaTexto.value = input;

 	while(/([-+xX./]){2,}/.test(input)){
 		console.log(input)
 		input = replaceOcurrence(input,/([-+xX./]){2,}/,'$1')	 	
 	}
 	caixaTexto.value = input;
}



function calculo(operacao, numero1, numero2){

    switch(operacao){
        case "X": case "x":
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
            	chamadaporbtn = true;
                inserir(caixaTexto, conteudo)  
                break;
        }
    }
}


function replaceOcurrence(string, regEx, replacement){
	return string.replace(regEx, replacement);
}