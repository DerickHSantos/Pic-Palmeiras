//Setup
const numeros = [];
let i = 0;
let j = 0;
let temp = "";
let rng = 0;

//Input de até 100 números
function entradaDeDados()
{
  if (i <= 99)
  {
    numeros[i] = document.getElementById("inputNumber").value;
    numeros[i] = Math.round(numeros[i]);
    document.getElementById("ultimoInserido").innerHTML = "O último número inserido foi: " + numeros[i];
    i++;
  }
  else
  {
    let erro = document.createElement("p");
    erro.innerHTML = "Máximo de números inseridos, operação com falha!";
    document.body.appendChild(erro);
  }
}

//Gerar relatório
function relatorio()
{
  //Ordenar em ordem crescente
  for(i = 0; i < numeros.length; i++)
  {
    for(j = i + 1; j < numeros.length; j++)
    {
      if(numeros[i] > numeros[j])
      {
        temp = numeros[i];
        numeros[i] = numeros[j];
        numeros[j] = temp;
      }
    }
  }
  let relatorio = numeros.join("<br>");
  document.getElementById("relatorioField").innerHTML = "Os números em ordem crescente são:<br>" + relatorio;
}

//Gerar número aleatório e adicionar ao array
function random(){
  rng = Math.round(Math.random() * 100);
  document.getElementById("ultimoInserido").innerHTML = "O último número inserido foi: " + rng;
  numeros[i] = rng;
  i++
}

//Mover botão "random"
//Carregar essa parte do script apenas depois de carregar a página toda
document.addEventListener('DOMContentLoaded', function() {

  //Escolher elemento arratável
  dragElement(document.getElementById("moveablediv"));

  //Permitir que seja arratável
  function dragElement(elmnt) {
    //Posições do cursor
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    //Mover conforme o cursor se movimenta ao apertar o botão do mouse
    elmnt.onmousedown = dragMouseDown;

    //Função "Ao pressionar o botão do mouse"
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      //Pega a posição do cursor so mouse
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      //Chama a função quando o cursor for movido
      document.onmousemove = elementDrag;
    }

    //Função "Mover a div"
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      //Atualiza as variáveis com a nova posição do cursor
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      //Muda a posição do div
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    //Função "Parar de mover"
    function closeDragElement() {
      //Para de executar quando o botão do mouse for solto
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
});