document.getElementById("areabotoes").addEventListener("click", acionarBotao);
document.getElementById("idinputnumber").addEventListener("input", inserir);

const priomultiplicacao = /\(([-+]?\d+)([xX])([-+]?\d+)\)/g;
const priodivisao = /\(([-+]?\d+)([/])([-+]?\d+)\)/g;
const priosoma = /\(([-+]?\d+)([+])([-+]?\d+)\)/g;
const priosubtracao = /\(([-+]?\d+)([-])([-+]?\d+)\)/g;

const multiplicacao = /([-+]?\d+)([xX])([-+]?\d+)/g;
const divisao = /([-+]?\d+)([/])([-+]?\d+)/g;
const soma = /([-+]?\d+)([+])([-+]?\d+)/g;
const subtracao = /([-+]?\d+)([-])([-+]?\d+)/g;

const todas_operacoes = [priomultiplicacao, priodivisao, priosoma, priosubtracao, multiplicacao, divisao, subtracao, soma];

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

    if( !(/=/.test(input)) ){

 		while(/[^-+xX./0-9]/.test(input)){
 			input = replaceOcurrence(input ,/[^-+xX./0-9]/, '');
 		}
 		caixaTexto.value = input;

 		while(/([-+xX./]){2,}/.test(input)){
 			console.log(input)
 			input = replaceOcurrence(input,/([-+xX./]){2,}/,'$1')	 	
 		}
 		caixaTexto.value = input;

 	}else {
 		input = replaceOcurrence(input,/=/,'');
 		caixaTexto.value = arrangeCalc(input);
 	}

}

function arrangeCalc(input){
	//enquanto não houver apenas um numero, positivo ou negativo
	while(!(/^[-+]?\d+$/.test(input))){
	//percorre cada operacao em ordem de prioridade 
		for(let i =0; i<8; i++){
			let calculos = [];
			let expressao;
			let num1 = [];
			let num2 = [];
			let op;
			//extrai cada operacao em ordem de prioridade
			//e insere no array para o calculo posterior
			while(expressao = todas_operacoes[i].exec(input)){

				//exec quando nao encontra match retorna null, que no caso é inserido no array 
				if(expressao != null)
					calculos.push(expressao[0]);
					op = expressao[2];
					num1.push(expressao[1]);
					num2.push(expressao[3]);
			}

			for(let j = 0; j<calculos.length; j++){
				console.log('Iteracao ' + j+1 + ';\n substituidor: ' + calculos[j]);
				let substitutor = calculos[j]
				let resultado = calculo(op, Number(num1[j]), Number(num2[j]));
				//como o replace substitui a operacao + caso ela venha antes do numero e isso
				//impediria o funcionamento correto, se adiciona o '+' caso o resultado seja positivo;
				input = input.replace(calculos[j], (resultado>=0)? '+' + resultado : resultado); 
				console.log('Expressao pos calculo: ' + input);
			}
		}
	}
	//depois que há apenas um numero positivo ou negativo no input, retorna o resultado;
	return input;
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
            return  numero1+numero2
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
                    caixaTexto.value = arrangeCalc(caixaTexto.value);
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