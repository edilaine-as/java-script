/*********************************************************************************************/
/*GERAIS**************************************************************************************/
/*********************************************************************************************/
"use strict";

let openModal = () => document.getElementById("modal").classList.add("active");

let closeModal = () => {
  clearFields();
  document.getElementById("modal").classList.remove("active");
};

let closeModalButton = () => {
  clearFields();
  document.getElementById("modal").classList.remove("active");
};

let getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? [];
//get recebe
//nessa função, eu estou recebendo, e transformando o que está sendo recebido em um objeto
//?? [] significa: se isso não existir, me retorna um array vazio

let setLocalStorage = (dbClient) =>
  localStorage.setItem("db_client", JSON.stringify(dbClient));
//set envia
//eu envio uma key (db_client) e um value (client)
//o JSON.stingfy vai transformar meu objeto em um valor

let isValidFields = () => {
  return document.getElementById("form").reportValidity(); //retornando se campos foram preenchidos ou não
};

/*********************************************************************************************/
/*CREATE - FUNÇÃO*****************************************************************************/
/*********************************************************************************************/

let createClient = (client) => {
  /*let db_client = [] //declarando como array (não funciona pois o dado é substituído)*/
  let dbClient = getLocalStorage();
  dbClient.push(client); //adiona novos itens no final do array

  setLocalStorage(dbClient);
};

/*********************************************************************************************/
/*READ - FUNÇÃO*******************************************************************************/
/*********************************************************************************************/
let readClient = () => getLocalStorage();

/*********************************************************************************************/
/*UPDATE - FUNÇÃO*****************************************************************************/
/*********************************************************************************************/
let updateClient = (index, client) => {
  let dbClient = readClient();
  dbClient[index] = client; //posição recebe novo cliente
  setLocalStorage(dbClient);
}; //essa função recebe meu index (id vai de 0 a ...) como parametro pra saber quem editar

/*********************************************************************************************/
/*DELETE - FUNÇÃO*****************************************************************************/
/*********************************************************************************************/
let deleteClient = (index) => {
  let dbClient = readClient();
  dbClient.splice(index, 1); //1 é de avançar uma casa, se eu colocar 2, ele vai excluir o index e o próximo; mas se eu colocar 0, eu poderia adionar um elemento (mas pra essa função não faz sentido)
  setLocalStorage(dbClient);
};

/*********************************************************************************************/
/*INTERAÇÕES**********************************************************************************/
/*********************************************************************************************/

/******************************/
/*LIMPEZA**********************/
/******************************/
let clearFields = () => {
  let fields = document.querySelectorAll(".modal-field"); //pegando os campos do meu formulario com essa classe
  fields.forEach((field) => (field.value = "")); //para cada campo de fields, eu crio uma variavel chamada field, e ela recebe null
  document.getElementById("nome").dataset.index = "new";
};

/******************************/
/*SALVAR***********************/
/******************************/

let saveClient = () => {
  if (isValidFields()) {
    //só cadastra se a função voltar como verdadeira
    let client = {
      //letroi novo cliente
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      celular: document.getElementById("cel").value,
      cidade: document.getElementById("cidade").value,
    };
    let index = document.getElementById("nome").dataset.index;
    if (index == "new") {
      createClient(client); //envia pro localstorage com função que criei
      updateTable();
      closeModal();
    } else {
      updateClient(index, client);
      updateTable();
      closeModal();
    }
  }
};

/******************************/
/*ADICIONANDO EM HTML**********/
/******************************/
let createRow = (client, index) => {
  let newRow = document.createElement("tr");
  newRow.innerHTML += `<td>${client.nome}</td>
                    <td>${client.email}</td>
                    <td>${client.celular}</td>
                    <td>${client.cidade}</td>
                    <td>
                        <button type="button" class="button green" data-action="editar-${index}">Editar</button>
                        <button type="button" class="button red" data-action='excluir-${index}'>Excluir</button>
                    </td>`;

  //data- é um atributo personalizado, e na frente dele colocamos o nome dele, poderia usar um id no lugar, mas eu quis assim

  document.querySelector("#tableClient>tbody").appendChild(newRow);
};

let clearTable = () => {
  let rows = document.querySelectorAll("#tableClient>tbody tr"); //pego as tr dentro de tbody que tá dentro de tableClient
  rows.forEach((row) => row.parentNode.removeChild(row)); //pega cada linha, pega o elemento pai dela, que é o tbody, e apaga o filho
};
let updateTable = () => {
  let dbClient = readClient(); //lê clientes do banco
  clearTable(); //função necessária, pois cada vez que eu faço um update, as informações vem replicadas
  dbClient.forEach(createRow); //forEach pega cada cliente e envia pra minha função createRow
  //o forEach envia 3 informações (o elemento do array, o index(indice),)
};

/******************************/
/*EDITAR E REMOVER*************/
/******************************/
let fillFields = (client) => {
  document.getElementById("nome").value = client.nome;
  document.getElementById("email").value = client.email;
  document.getElementById("cel").value = client.celular;
  document.getElementById("cidade").value = client.cidade;
  document.getElementById("nome").dataset.index = client.index;
};

let editClient = (index) => {
  let client = readClient()[index]; //recebe o array de posição tal
  client.index = index;
  fillFields(client);
  openModal();
};

let editDelete = (event) => {
  if (event.target.type == "button") {
    //o target retorna onde foi clicado
    let [action, index] = event.target.dataset.action.split("-");
    //primeiro eu crio um array que pega a ação e a posição
    //depois tô pegando meu atributo personalizado de nome action
    //o split vai separar minha ação da posição pelo '-'

    if (action == "editar") {
      editClient(index);
    } else {
      let client = readClient()[index];
      let response = confirm(`Deseja mesmo excluir o cliente ${client.nome}?`);
      if (response) {
        deleteClient(index);
        updateTable();
      }
    }
  }
};

updateTable();

/******************************/
/*BUSCAR***********************/
/******************************/

let searchClient = () => {
  let busca = document.getElementById("txtSearch").value.toLowerCase();

  for (let i = 0; i < tbody.children.length; i++) {
    let achou = false; //tipo let pra ser reatribuído depois
    let tr = tbody.children[i];
    let td = tr.children;
    //childNodes não deu certo, pois ele pegou elementos text nodes e comentários nodes
    //children retorna apenas elementos

    for (let j = 0; j < td.length - 1; j++) {
      let value = td[j].childNodes[0].nodeValue.toLowerCase();
      if (value.indexOf(busca) >= 0) {
        //indexOf procura uma ocorrencia
        achou = true;
      }
    }
    if (achou) {
      tr.style.display = "table-row";
    } else {
      tr.style.display = "none"; //oculta
      tr.style.display = "none"; //ocultar
    }
  }
};

/*********************************************************************************************/
/*EVENTOS*************************************************************************************/
/*********************************************************************************************/
document.getElementById("txtSearch").addEventListener("keyup", searchClient);

document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

document
  .getElementById("modalCloseButton")
  .addEventListener("click", closeModalButton);

document.getElementById("salvar").addEventListener("click", saveClient);

document
  .querySelector("#tableClient>tbody")
  .addEventListener("click", editDelete);
