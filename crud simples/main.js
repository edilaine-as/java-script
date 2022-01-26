/*********************************************************************************************/
/*GERAIS**************************************************************************************/
/*********************************************************************************************/
"use strict";

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () => {
  clearFields();
  document.getElementById("modal").classList.remove("active");
};

const closeModalButton = () => {
  clearFields();
  document.getElementById("modal").classList.remove("active");
};

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_client")) ?? [];
//get recebe
//nessa função, eu estou adicionando, e transformando o que está sendo recebido em um objeto
//?? [] significa: se isso não existir, me retorna um array vazio

const setLocalStorage = (dbClient) =>
  localStorage.setItem("db_client", JSON.stringify(dbClient));
//set envia
//eu envio uma key (db_client) e um value (client)
//o JSON.stingfy vai transformar meu objeto (tempCliente) em um valor

const isValidFields = () => {
  return document.getElementById("form").reportValidity(); //retornando se campos foram preenchidos ou não
};

/*********************************************************************************************/
/*CREATE - FUNÇÃO*****************************************************************************/
/*********************************************************************************************/

const createClient = (client) => {
  /*const db_client = [] //declarando como array (não funciona pois o dado é substituído)*/
  const dbClient = getLocalStorage();
  dbClient.push(client); //adiona novos itens no final do array

  setLocalStorage(dbClient);
};

/*********************************************************************************************/
/*READ - FUNÇÃO*******************************************************************************/
/*********************************************************************************************/
const readClient = () => getLocalStorage();

/*********************************************************************************************/
/*UPDATE - FUNÇÃO*****************************************************************************/
/*********************************************************************************************/
const updateClient = (index, client) => {
  const dbClient = readClient();
  dbClient[index] = client; //posição recebe novo cliente
  setLocalStorage(dbClient);
}; //essa função recebe meu index (id vai de 0 a ...) como parametro pra saber quem editar

/*********************************************************************************************/
/*DELETE - FUNÇÃO*****************************************************************************/
/*********************************************************************************************/
const deleteClient = (index) => {
  const dbClient = readClient();
  dbClient.splice(index, 1); //1 é de avançar uma casa, se eu colocar 2, ele vai excluir o index e o próximo; mas se eu colocar 0, eu poderia adionar um elemento (mas pra essa função não faz sentido)
  setLocalStorage(dbClient);
};

/*********************************************************************************************/
/*INTERAÇÕES**********************************************************************************/
/*********************************************************************************************/

/******************************/
/*LIMPEZA**********************/
/******************************/
const clearFields = () => {
  const fields = document.querySelectorAll(".modal-field"); //pegando os campos do meu formulario com essa classe
  fields.forEach((field) => (field.value = "")); //para cada campo de fields, eu crio uma variavel chamada field, e ela recebe null
};

/******************************/
/*SALVAR***********************/
/******************************/
const saveClient = () => {
  if (isValidFields()) {
    //só cadastra se a função voltar como verdadeira
    const client = {
      //constroi novo cliente
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      celular: document.getElementById("cel").value,
      cidade: document.getElementById("cidade").value,
    };
    const index = document.getElementById("nome").dataset.index;
    if (index == "new") {
      createClient(client); //envia pro localstorage com função que criei
      updateClient();
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
const createRow = (client, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
                    <td>${client.nome}</td>
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

const clearTable = () => {
  const rows = document.querySelectorAll("#tableClient>tbody tr"); //pego as tr dentro de tbody que tá dentro de tableClient
  rows.forEach((row) => row.parentNode.removeChild(row)); //pega cada linha, pega o elemento pai dela, que é o tbody, e apaga o filho
};
const updateTable = () => {
  const dbClient = readClient(); //lê clientes do banco
  clearTable(); //função necessária, pois cada vez que eu faço um update, as informações vem replicadas
  dbClient.forEach(createRow); //forEach pega cada cliente e envia pra minha função createRow
  //o forEach envia 3 informações (o elemento do array, o index(indice),)
};

/******************************/
/*EDITAR E REMOVER**************/
/******************************/
const fillFields = (client) => {
  document.getElementById("nome").value = client.nome;
  document.getElementById("email").value = client.email;
  document.getElementById("cel").value = client.celular;
  document.getElementById("cidade").value = client.cidade;
  document.getElementById("nome").dataset.index = client.index;
};

const editClient = (index) => {
  const client = readClient()[index]; //recebe o array de posição tal
  client.index = index;
  fillFields(client);
  openModal();
};

const editDelete = (event) => {
  if (event.target.type == "button") {
    //o target retorna onde foi clicado
    const [action, index] = event.target.dataset.action.split("-");
    //primeiro eu crio um array que pega a ação e a posição
    //depois tô pegando meu atributo personalizado de nome action
    //o split vai separar minha ação da posição pelo '-'

    if (action == "editar") {
      editClient(index);
    } else {
      const client = readClient()[index];
      const response = confirm(
        `Deseja mesmo excluir o cliente ${client.nome}?`
      );
      if (response) {
        deleteClient(index);
        updateTable();
      }
    }
  }
};

updateTable();

/*********************************************************************************************/
/*EVENTOS*************************************************************************************/
/*********************************************************************************************/
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
