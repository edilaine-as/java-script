function exibir(){
    var numero = document.querySelector('#numero').value

    if(numero.length == 0){
        alert('Por favor, informe um número!')
    }
    else{
        numero = Number(numero)
    }
}