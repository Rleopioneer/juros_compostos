/* Construa uma aplicação que fará uma simulação de investimento utilizando juros compostos. A aplicação terá duas telas:

Primeira tela
A primeira tela deve ter um formulário com os campos: nome, mensalidade, taxa de juros, tempo de contribuição e um botão simular.

Ao clicar em simular, deve ser feito um POST na api http://api.mathjs.org/v4/.

O body deverá ser um JSON com a seguinte estrutura: { "expr": "" }. Em expr vai a expressão matemática para calcular o juros compostos. Deverá ser usada a seguinte fórmula: [valor da mensalidade * (((1 + [taxa de juros]) ^ [tempo de contribuicao em meses] - 1) / [taxa de juros]).

Exemplo:

Se os parametros forem:

Valor da mensalidade: R$ 20,00
Taxa de juros: 0,517% ao mês
Tempo de contribuição: 2 anos

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

    let hasError = true

    let inputName = document.forms['form']['name']
    console.log(inputName.value)

    let inputPayment = document.forms['form']['payment']
    console.log(inputPayment.value)

    let inputTimeValue = document.forms['form']['timeValue']
    console.log(inputTimeValue.value)

    let radio = document.forms['form']['radio']
    console.log(radio.value)

    console.log(`Olá ${inputName.value}! Aplicando o valor de R$${inputPayment.value}  com a taxa de juros compostos de XXXX% você terá o valor acumulado ao final de ${inputTimeValue.value} ${radio.value}: R$${inputPayment.value*inputTimeValue.value}`)

    let btn = document.forms['form']['btn']
    console.log(btn)

    const toJson = res => res.json()

    const errorHandling = () => console.log("Erro")

    const options = {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Headers": "Accept",
            "Access-Control-Allow-Origin": "http://127.0.0.1:5500/",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Max-Age": 86400,
        },
        body: {
            "expr": [`${inputPayment.value} * (((1 + 0.00517) ^ ${inputTimeValue.value} - 1) / 0.00517)`],
            "precision": 2
        }
    }

    fetch('http://api.mathjs.org/v4/', options).then(toJson).catch(errorHandling)

    if (!hasError) {
        form.submit()

    }

    

}

