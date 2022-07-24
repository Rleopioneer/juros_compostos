/* Construa uma aplicação que fará uma simulação de investimento utilizando juros compostos. A aplicação terá duas telas:

Primeira tela
A primeira tela deve ter um formulário com os campos: nome, mensalidade, taxa de juros, tempo de contribuição e um botão simular.

O body da request deverá ser:
{ "expr": "20 * (((1 + 0.00517) ^ 24 - 1) / 0.00517)" }

Segunda tela
A segunda tela deverá exibir um texto com as informaçoes dos campos de nome, mensalidade, tempo e o resultado da request.

Exemplo:

Olá [nome], investindo R$[mensalidade] todo mês, você terá R$[resultado da request] em [tempo] sob uma taxa de juros de [taxa] ao mês. */

const form = document.querySelector('#form')
const firstScreen = document.querySelector('.firstScreen')
const secondScreen = document.querySelector('.secondScreen')


form.onsubmit = function (e){
    e.preventDefault()

    console.log(e)

    let hasError = false

    const inputName = document.forms['form']['name']
    
    if(!inputName.value) {
        hasError = true
        inputName.classList.add('error')
        let span = inputName.nextSibling.nextSibling
        span.innerText = 'Digite o nome corretamente'
    } else {
        inputName.classList.remove('error')
        
        let span = inputName.nextSibling.nextSibling
        span.innerText = ''
    }

    const inputPayment = document.forms['form']['payment']
    
    if (!inputPayment.value) {
        hasError = true
        inputPayment.classList.add('error')
        let span = inputPayment.nextSibling.nextSibling
        span.innerText = 'Digite um número válido'
    } else {
        inputPayment.classList.remove('error')
        let span = inputPayment.nextSibling.nextSibling
        span.innerText = ''
    }

    const inputTimeValue = document.forms['form']['timeValue']
    
    if (!inputTimeValue.value) {
        hasError = true
        inputTimeValue.classList.add('error')
        let span = inputTimeValue.nextSibling.nextSibling
        span.innerText = 'Digite um número válido'
    } else {
        inputTimeValue.classList.remove('error')
        let span = inputTimeValue.nextSibling.nextSibling
        span.innerText = ''
    }

    const radio = document.forms['form']['radio']
    
    if (!radio.value ) {
        hasError = true
        console.log('erro')
        radio[1].classList.add('error')
        let span = radio[1].nextSibling.nextSibling
        span.innerText = 'Selecione uma opção'
    } else {
        radio[1].classList.remove('error')
        let span = radio[1].nextSibling.nextSibling
        span.innerText = ''
    }

    const btn = document.forms['form']['btn']
 
    if (!hasError) {

        const toJson = res => res.json()     
    
        function constructData (res) {
            const result = res.result
            console.log(result)
            firstScreen.classList.remove('visible')
            firstScreen.classList.add('hidden')
            secondScreen.classList.remove('hidden')
            secondScreen.innerHTML += `<h1>Sua simulação retornou o seguinte valor:${result}</h1>`
        }
            
        const errorHandling = error => console.log(error)

        const config = {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: `{"expr": "${inputPayment.value} * (((1 + 0.00517) ^ ${inputTimeValue.value} - 1) / 0.00517)"}`,
            
        }

        fetch('http://api.mathjs.org/v4/', config).then(toJson).then(constructData).catch(errorHandling)



        form.submit()        

    }

}

