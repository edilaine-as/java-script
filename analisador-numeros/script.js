let num = document.querySelector('#fnum')
let lista = document.querySelector('#flista')
let res = document.querySelector('#res')
let valores = []

function isNumero(n){
    if(Number(n)>=1 && Number(n)<=100){
        return true
    }
    else{
        return false
    }
}

function inLista(n, l){
    if(l.indexOf(Number(n)) != -1){
        return true
    }
    else{
        return false
    }
}

function adicionar(){

    if(isNumero(num.value) && !inLista(num.value, valores)){ //! é não pertence, sinal de negação
        valores.push(Number(num.value)) //push para adicionar em vetor

        let item = document.createElement('option')
        item.text = `Valor ${num.value} foi adicionado`
        lista.appendChild(item)
        res.innerHTML = ''
    }
    else{
        alert('Valor inválido ou já encontrado na lista!')
    }
    num.value = '' //apagando valor no campo depois que adicionar
    num.focus() //focando no campo
}

function finalizar(){
    if(valores.length == 0){
        alert('Por favor, adicione valores antes de finalizar!')
    }
    else{
        let total = valores.length
        let maior = valores[0]
        let menor = valores[0]

        for(let i in valores){
            if(valores[i]>maior){
                maior = valores[i]
            }
            if(valores[i]<menor){
                menor = valores[i]
            }
        }

        res.innerHTML = ''
        res.innerHTML += `<p>Ao todo, temos ${total} números cadastrados.</p>`
        res.innerHTML += `<p>O menor valor é ${menor}</p>`
        res.innerHTML += `<p>O maior valor é ${maior}</p>`
    }
}

