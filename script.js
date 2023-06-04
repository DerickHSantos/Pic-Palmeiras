//Setup
let i = 0;
let j = 0;
const clienteDados = [];
let relatorioText = "";
let cep = "";
let logradouro = "";
let bairro = "";
let cidade = "";
let estado = "";
var enderecoCompleto = "";
var enderecoCompletao = "oi";

//Entrada de dados de todos os inputs 
//Função assíncrona para não dar conflito com a API Via CEP
async function entradaDeDados() {
  clienteDados[i, j] = "Tipo de Cliente: " + document.getElementById("clientClass").value;
  j++;

  clienteDados[i, j] = "Nome do Cliente: " + document.getElementById("nomeCliente").value;
  j++;

  clienteDados[i, j] = "CPF/CNPJ do Cliente: " + document.getElementById("cpfCliente").value;
  j++;

  //Fazer a requisição com a API dos Correios
  cepCliente = document.getElementById("enderecoCliente").value;

  try {
    enderecoCompletao = await buscarEndereco(cepCliente);
  } catch (error) {
    console.log("Ocorreu um erro ao buscar o endereço:", error);
    return;
  }

  clienteDados[i, j] = "Endereço do Cliente: " + enderecoCompletao;
  j++;

  clienteDados[i, j] = "Telefone do Cliente: " + document.getElementById("telefoneCliente").value;
  j++;

  //Informar o limite 
  if (clienteDados[i, 0] == "Tipo de Cliente: Cliente Padrão") {
    //Gerador de limite
    let rng1 = Math.round(Math.random() * 3069);
    let rng2 = rng1 - Math.round(Math.random() * rng1);
    clienteDados[i, j] = "Limite disponível: R$" + rng2 + " de R$" + rng1;
  } else if (clienteDados[i, 0] == "Tipo de Cliente: Cliente Especial") {
    clienteDados[i, j] = "Limite do Cliente: Limite Ilimitado";
  } else {
    //Gerador de limite
    let rng1 = Math.round(Math.random() * 10420);
    let rng2 = rng1 - Math.round(Math.random() * rng1);
    clienteDados[i, j] = "Limite estourado: R$" + rng1 + " de R$" + rng2;
  }
  j = 0;
  i++;

  //Preparar a varável de relatório com todos os clientes
  relatorioText += clienteDados.join("<br>") + "<hr>";
}

//Mostrar o relatório
function relatorio() {
  document.getElementById("relatorio").innerHTML = relatorioText;
}

//Via CEP
function buscarEndereco(valor) {
  cep = valor.replace(/\D/g, "");

  //Verificar se o Campo CEP é válido
  if (cep.length !== 8) {
    alert("O CEP deve conter 8 dígitos!");
    return Promise.reject("CEP inválido"); 
  }

  //API dos Correios
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  //Verificar o CEP
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //Se erro, mostrar erro
      if (data.erro) {
        alert("CEP não encontrado!");
        //Interromper execução
        throw new Error("CEP não encontrado");
      } 
      //Pegar informações
      else 
      {
        logradouro = data.logradouro;
        bairro = data.bairro;
        cidade = data.localidade;
        estado = data.uf;

        //Compilar tudo em uma variável formatada
        enderecoCompleto = "<br>CEP: " + cep + "<br>Logradouro: " + logradouro + "<br>Bairro " + bairro + "<br>Cidade " + cidade + "<br>Estado " + estado;

        //Retornar resultado
        return enderecoCompleto;
      }
    })

    //Se der erro, deu erro
    .catch((error) => {
      console.log("Ocorreu um erro na requisição:", error);
      throw error;
    });
}
