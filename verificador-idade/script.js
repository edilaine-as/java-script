function verificar(){
    var data = new Date()
    var ano = data.getFullYear()

    var anoUser = document.querySelector('#ano').value
    var res = document.querySelector('#res')

    if(anoUser.length == 0 || anoUser>ano){
        window.alert('Verifique os dados e tente novamente...')
    }
    else{
            var sexo = document.getElementsByName('sexo')
            var img = document.createElement('img') //criando elemento no html
            img.setAttribute('id', 'foto') //criando id foto para elemento criado

            anoUser = Number(anoUser)
            var idade = ano - anoUser

            if(sexo[0].checked){
                    if(idade>=0 && idade<=2 ){
                        res.innerHTML = `<p>É um bebê de ${idade} anos</p>`
                        img.setAttribute('src', 'Imagens/bb-m.png') //definindo src de imagem
                    }
                    else if(idade<=12){
                        res.innerHTML = `<p>É um menino de ${idade} anos</p>`
                    }
                    else if(idade<18){
                        res.innerHTML = `<p>É um adolescente de ${idade} anos</p>`
                    }
                    else if(idade<30){
                        res.innerHTML = `<p>É um jovem de ${idade} anos</p>`
                        img.setAttribute('src', 'Imagens/jovem-m.png') 
                    }
                    else if(idade<60){
                        res.innerHTML = `<p>É um adulto de ${idade} anos</p>`
                        img.setAttribute('src', 'Imagens/adulto-m.png') 
                    }
                    else{
                        res.innerHTML = `<p>É um senhor de ${idade} anos</p>`
                        img.setAttribute('src', 'Imagens/idoso-m.png') 
                    }
                }

            else{
                    if(idade>=0 && idade<=2 ){
                        res.innerHTML = `<p>É uma bebê de ${idade} anos</p>`
                        img.setAttribute('src', 'Imagens/bb-f.png')  
                    }
                    else if(idade<=12){
                        res.innerHTML = `<p>É uma menina de ${idade} anos</p>` 
                    }
                    else if(idade<18){
                        res.innerHTML = `<p>É uma adolescente de ${idade} anos</p>`
                    }
                    else if(idade<30){
                        res.innerHTML = `<p>É uma jovem de ${idade} anos</p>`
                        img.setAttribute('src', 'Imagens/jovem-f.png') 
                    }
                    else if(idade<60){
                        res.innerHTML = `<p>É uma adulta de ${idade} anos</p>`
                        img.setAttribute('src', 'Imagens/adulto-f.png') 
                    }
                    else{
                        res.innerHTML = `<p>É uma senhora de ${idade} anos</p>`
                        img.setAttribute('src', 'Imagens/idoso-f.png') 
                    }
                }
            
                res.appendChild(img) //adicionando tag imagen

            }
}   
