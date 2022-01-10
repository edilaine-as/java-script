function calcular(){

    var inicio = document.querySelector('#inicio').value
    var fim = document.querySelector('#fim').value
    var passo = document.querySelector('#passo').value
    var res = document.querySelector('#res')

    if((inicio.lenght == 0) || (fim.length == 0) || (passo.length == 0)){
        res.innerHTML='<p>Impossível contar...</p>'
        alert('Por favor, informe os valores corretamente!!!')
    }
    else if((Number(passo) <= 0) || (Number(passo)>fim)){
        res.innerHTML='<p>Impossível contar...</p>'
        alert('Por favor, informe um passo válido!!!')
    }
    else{
        inicio=Number(inicio)
        fim=Number(fim)
        passo=Number(passo)

        res.innerHTML = '<p>Contando...</p>'

       if(inicio<fim){ //contagem crescente
            for(var i=inicio; i<=fim; i+=passo){
                res.innerHTML += `${i} ➡️` 
            } 
        }
        else{ //contagem regressiva
            for(var i=inicio; i>=fim; i-=passo){
                res.innerHTML += `${i} ➡️` 
            }
        }
        
        res.innerHTML += `\u{1F3C1}` //em js colocamos \u antes do código do emoji (sem U+)
    }

}