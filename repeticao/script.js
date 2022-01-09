function calcular(){

    var inicio = document.querySelector('#inicio').value
    var fim = document.querySelector('#fim').value
    var passo = document.querySelector('#passo').value

    if((inicio.lenght == 0) || (fim.length == 0) || (passo.length == 0)){
        alert('Por favor, informe os valores corretamente!!!')
    }
    else if(passo == '0'){
        alert('Impossivel contar!')
    }
    else{
        inicio=Number(inicio)
        fim=Number(fim)
        passo=Number(passo)

        var res = document.querySelector('#res')

        res.innerHTML = '<p>Contando...</p>'

        for(var i=inicio; i<=fim; i+=passo){
            res.innerHTML += `${i} ➡️` 
        }   
    }

}