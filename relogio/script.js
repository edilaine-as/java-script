function carregar(){
    var data = new Date()
    var hora = data.getHours()
    var minutos = data.getMinutes()
    var segundos = data.getSeconds()
    
    var saudar = document.querySelector('#msg')
    var imagem = document.querySelector('#img')
    
    var corpo = document.querySelector('body')
    
    if(hora>0 && hora<6){
        saudar.innerHTML = 'Boa madrugada!'
        imagem.innerHTML = '<img src="Imagens/noite1.png" alt="Foto da madrugada">'
        corpo.style.backgroundColor = '#11161C'
    }
    else if(hora<12){
        saudar.innerHTML = 'Bom dia!'
        imagem.innerHTML = '<img src="Imagens/manha.png" alt="Foto do dia">'
        corpo.style.backgroundColor = '#B9CFDA'
    
    }
    else if(hora<18){
        saudar.innerHTML = 'Boa tarde!'
        imagem.innerHTML = '<img src="Imagens/tarde.png" alt="Foto da tarde">'
        corpo.style.backgroundColor = '#D1752F'
    
    }
    else{
        saudar.innerHTML = 'Boa noite!'
        imagem.innerHTML = '<img src="Imagens/noite.png" alt="Foto da noite">'
        corpo.style.backgroundColor = '#102F32'
    }

    if (minutos < 10){
        minutos = "0" + minutos
    }
    if (segundos < 10){
        segundos = "0" + segundos
    }
    
    saudar.innerHTML+= `<br>Agora são ${hora}:${minutos}:${segundos} horas.`

    window.setInterval('carregar()', 1000)
}