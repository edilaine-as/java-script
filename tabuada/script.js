function exibir(){
    var numero = document.querySelector('#numero').value

    if(numero.length == 0){
        alert('Por favor, informe um número!')
    }
    else{
        var tab = document.querySelector('#tab')

        numero = Number(numero)

        tab.innerHTML = ''

        for(var i=0; i<=10; i++){
            var item = document.createElement('option')
            item.text = `${numero}x${i} = ${numero*i}`
            item.value = `tab${i}` //para outras linguagens
            tab.appendChild(item)
        }
    }
}