var timerId = null; //variavel que armazena a chamada da função timeout
//funções
function iniciaJogo(){
	var url = window.location.search; //pega a url da index

	var nivel_jogo = url.replace("?", ""); //pega o valor da url só com o valor


	var tempo_segundos = 0; //tempo segundos inicial

	if(nivel_jogo == 1){ // 1 Fácil -> 120 segundos
		tempo_segundos = 120;
	}

	if(nivel_jogo == 2){ // 2 Normal -> 60 segundos
		tempo_segundos = 60;
	}

	if(nivel_jogo == 3){ // 3 Difícil -> 30 segundos
		tempo_segundos = 30;
	}
		//Inserindo segundos no span
		document.getElementById('cronometro').innerHTML = tempo_segundos; //coloca a variavel tempo_segundos dentro do id='cronometro' na index.
	
		//Quantidade de balões
		var qtde_baloes = 80;

		criaBaloes(qtde_baloes);

		//Imprimir qtde baloes inteiros
		document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
		//Imprimir qtde baloes inteiros
		document.getElementById('baloes_estourados').innerHTML = 0;

		contagem_tempo(tempo_segundos + 1);
}

function contagem_tempo(segundos){
	segundos = segundos - 1;

	if(segundos == -1){
		clearTimeout(TimerId); //para a execuçao so settimeout
		game_over();
		return false;
	}
	document.getElementById('cronometro').innerHTML = segundos;
	
	timerId = setTimeout("contagem_tempo("+segundos+")",1000);

}
function game_over(){
	remover_eventos_baloes();
	alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo.');
}

function criaBaloes(qtde_baloes){
	for (var i = 1; i <= qtde_baloes; i++) {

		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '12px';
		balao.id ='b'+i;
		balao.onclick = function(){
			estourar(this);
		};

		document.getElementById('cenario').appendChild(balao); //adiciona o elemento sobre o cenario
	}
}
function estourar(e){
	var id_balao = e.id;
	document.getElementById(id_balao).setAttribute("onclick", "");
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
	
	pontuacao(-1);
}

function pontuacao(acao){
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_estourados = parseInt(baloes_estourados);
	baloes_inteiros = parseInt(baloes_inteiros);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;
	
	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);
}
function situacao_jogo(baloes_inteiros){
	if(baloes_inteiros == 0){
		alert('Parabens você conseguiu estourar todos os baloes');
		parar_jogo();
	}

}
function parar_jogo(){
	clearTimeout(timerId);
}
function remover_eventos_baloes(){
	var i = 1; //contado para recuperar balões por id
	//percorre os elementos de acordo com o id e só irá sair do laço quando não houver correspondencia com elemento
	while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}