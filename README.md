# teste_juros_compostos
Criação de aplicação para teste para a vaga de Frontend Developer Júnior. Desenvolvimento de uma página simulando uma aplicação contendo duas telas, a primeiira contendo um campo de formulário para simulalçao de investimento, a segunda contendo o resultado da simulação e um botão para fazer uma nova simulação. Simulação calculada por meio de uma requisição POST para a API.

## Conteúdo

- Visão Geral
  - Screenshot
  - [Links](https://github.com/Rleopioneer/teste_juros_compostos/blob/master/README.md#links)
- Meu Processo
  - [Desenvolvido com](https://github.com/Rleopioneer/teste_juros_compostos/blob/master/README.md#built-with)
  - [O que aprendi](https://github.com/Rleopioneer/teste_juros_compostos/master/README.md#what-i-learned)
  - [Recursos Úteis](https://github.com/Rleopioneer/teste_juros_compostos/master/README.md#useful-resources)
- [Autor](https://github.com/Rleopioneer/teste_juros_compostos/master/README.md#author)



## Screenshot

![](https://github.com/Rleopioneer/juros_compostos/blob/86b65cd78860d2ddde7d5ecb4a95db8f8f0eed89/img/screenshot.png)



## [Links](https://github.com/Rleopioneer/teste_juros_compostos/blob/master/README.md#links)

- Live Preview: [GitHub Pages]([Simule seus Investimentos aqui! (rleopioneer.github.io)](https://rleopioneer.github.io/juros_compostos/))
- 

## Meu Processo

### Desenvolvido com

- JavaScript
- HTML5
- CSS3
- SASS

### O que aprendi

Página desenvolvida de acordo com as instruções do teste.

Adiciona animação de carregamento após o envio do formulário com setTimeout:

 

```javascript
setTimeout(function() {
            console.log('Hello World')
            content_spinner.classList.add('hidden')
            resultDisplay.classList.remove('hidden')
        }, 4000)
```

Validação do formulário:

```javascript
form.onsubmit = function (e){

    e.preventDefault()
```



Verificação da quantidade de tempo desejada pelo usuário e se o valor se refere ao período de meses ou anos:

```javascript
const inputTimeValue = document.forms['form']['timeValue']
    const radio = document.forms['form']['radio']
                
    if (!radio.value || !inputTimeValue) {
        hasError = true
        let span = e.target.childNodes[9].childNodes[5]
        console.log(span)
        span.classList.add('error')
        span.innerText = 'Determine um número e selecione uma opção'
    } else {
        let span = e.target.childNodes[9].childNodes[5]
        span.classList.remove('error')
        span.innerText = ''
    }
```

Configurações a serem passadas na requisição, campo body preenchido usando template string, fazendo uma verificação usando if ternário para calcular o período de tempo dependendo da escolha do usuário e tranformando o valor da taxa de juros em número decimal:

```javascript
const config = {
        headers: {
            "content-type": "application/json"
        },
        method: "POST",
        body: `{"expr": "${inputPayment.value} * (((1 + ${interestValue / 100}) ^ ${radio.value === 'anos'? (inputTimeValue.value  * 12): inputTimeValue.value} - 1) / ${interestValue / 100})"}`,
        
    }
```

Obtenção da resposta da requisição e construção da segunda tela e função para recarregar nova página atribuída ao botão:

```javascript
   function constructData (res) {
            const result = res.result
            firstScreen.classList.remove('visible')
            firstScreen.classList.add('hidden')
            secondScreen.classList.remove('hidden')
            secondScreen.innerHTML = 
            `<h1>Olá ${inputName.value}, juntando R$${inputPayment.value}.00 todo mês, você terá o valor de R$${parseFloat(result).toFixed(2)} em ${inputTimeValue.value} ${radio.value}</h1>

            <button class="returnButton">Simular Novamente</button>
            `
            //atribui função para recarregar a página e fazer uma nova simulação
            const returnButton = document.querySelector('.returnButton')
            returnButton.onclick = function(){
                location.reload(false)
            }
        
        }
```



Consumo dos dados requisitados e construção dos cards e botão de nova página que fará uma nova requisição da página seguinte da API reaproveitando as funções já definidas:

```js
function buildProductBoxes (response) {

    for (let i = 0; i < response.products.length ; i ++) {

        obj.boxes.innerHTML += `
            <div class="box">
                <div class="img">
                    <img src="https://${response.products[i].image}" alt="Porduct Image" class="product_img">
                </div>
                 
                <div class="productText">    
                    <h4> ${response.products[i].name} </h4>
                    <p>${response.products[i].description}</p>
                    <p>De: R$${response.products[i].oldPrice}</p>
                    <p>Por:R$${response.products[i].price}</p>
                    <p>ou ${response.products[0].installments.count} x de R$${response.products[0].installments.value}</p>
                    <button>Comprar</button>
                </div>
            </div>
            `
        
    }
    
    obj.newPage.classList.add('visible')
    obj.newPage.classList.remove('hidden')
    obj.btnNewPage.onclick = function(e) {
        fetch(`https://${response.nextPage}`).then(toJson).then(buildProductBoxes).catch(errorMsg)
    
    }

}
```

### Conteúdos úteis

- [Font Awesome](https://fontawesome.com/)

## Author

- [Ramon Leonardo](https://www.linkedin.com/in/ramon-leonardo-rx/)
- Instagram- [@rcl.leo](https://www.instagram.com/rcl.leo/)
