"use strict";

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () =>
  document.getElementById("modal").classList.remove("active");

const closeModalButton = () =>
  document.getElementById("modal").classList.remove("active");

const tempCliente = {
  nome: "Fernando",
  email: "fernando.silva@gmail.com",
  celular: "19007780900",
  cidade: "Americana",
};

const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? []; //criando função tipo arrow
const setLocalStorage = (dbClient) =>
  localStorage.setItem("db_client", JSON.stringify(dbClient));

//create
const createClient = (client) => {
  /*const db_client = [] //declarando como array (não funciona pois o dado é substituído)*/
  const dbClient = getLocalStorage(); //nessa função, eu estou adicionando dentro do array, e transformando o que está sendo recebido em um objeto, pois para a linha abaixo ser executada, eu preciso pegar um objeto pra transformar em um valor e adicionar no banco
  //?? [] significa: se isso não existir, me retorna um array vazio
  dbClient.push(client);

  setLocalStorage(dbClient);
  //set envia, get recebe
  //eu envio uma key (db_client) e um value (client)
  //o JSON.stingfy vai transformar meu objeto (tempCliente) em um valor
};

//read
const readClient = () => getLocalStorage()

//update
const updateClient = (index, client) =>{
    const dbClient = readClient()
    dbClient[index] = client //index recebe novo cliente
    setLocalStorage(dbClient)

} //essa função recebe meu index (id vai de 0 a ...) como parametro pra saber quem editar

//delete
const deleteClient = (index) =>{
    const dbClient = readClient()
    dbClient.splice(index,1) //1 é de avançar uma casa, se eu colocar 2, ele vai excluir os dois proximos do index passado como parametro
    setLocalStorage(dbClient)
}

const isValidFields = () =>{
    return document.getElementById('form').reportValidity() //retornando se campos foram preenchidos ou não
}

//interações
const saveClient = () =>{
    if(isValidFields()){ //só cadastra se a função voltar como verdadeira
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('cel').value,
            cidade: document.getElementById('cidade').value
        }
        createClient(client)
    }
}

//Eventos
document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

document
  .getElementById("modalCloseButton")
  .addEventListener("click", closeModalButton);

document.getElementById('salvar')
    .addEventListener('click', saveClient)
