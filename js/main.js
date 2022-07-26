/*************** Juros Compostos **************/

const form = document.querySelector('#form')

form.onsubmit = function (e){
    e.preventDefault()
    
    const firstScreen = document.querySelector('.firstScreen')
    const secondScreen = document.querySelector('.secondScreen')

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

    const inputInterest = document.forms['form']['interest']
    const interestValue = parseFloat(inputInterest.value)
    
    if (!inputInterest.value) {
        hasError = true
        inputPayment.classList.add('error')
        let span = inputInterest.nextSibling.nextSibling
        span.innerText = 'Digite um número válido'
    } else {
        inputInterest.classList.remove('error')
        let span = inputInterest.nextSibling.nextSibling
        span.innerText = ''
    }
    
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
 
    if (!hasError) {

        const content_spinner = document.querySelector('.content_spinner')
        const resultDisplay = document.querySelector('.resultDisplay')

        firstScreen.classList.add('hidden')
        secondScreen.classList.remove('hidden')
        
        /* Adiciona animação de loading */
        setTimeout(function() {
            
            content_spinner.classList.add('hidden')
            resultDisplay.classList.remove('hidden')
            
        }, 4000)

        
        /* Fetch API */
        const config = {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: `{"expr": "${inputPayment.value} * (((1 + ${interestValue / 100}) ^ ${radio.value === 'anos'? (inputTimeValue.value  * 12): inputTimeValue.value} - 1) / ${interestValue / 100})"}`,
            
        }

        const toJson = res => res.json()     
    
        function constructData (res) {
            const result = res.result
            
            

            resultDisplay.innerHTML = 
            `<h1>Olá ${inputName.value}, juntando R$${inputPayment.value}.00 todo mês, você terá o valor de R$${parseFloat(result).toFixed(2)} em ${inputTimeValue.value} ${radio.value}</h1>

            <button class="returnButton">Simular Novamente</button>
            `
            
            //atribui função para recarregar a página e fazer uma nova simulação
            const returnButton = document.querySelector('.returnButton')
            returnButton.onclick = function(){
                location.reload(false)
            }
        
        }
            
        const errorHandling = error => console.log(error)

        fetch('https://api.mathjs.org/v4/', config).then(toJson).then(constructData).catch(errorHandling)

        form.submit()        

    }

}
