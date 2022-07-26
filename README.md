# teste_landing_page
Criação de landing page para teste para a vaga de Frontend Developer Júnior. Desenvolvimento de uma página funcional contendo dois formulários e grade de produtos a ser preenchida após consumir uma API. Página desenvolvida de acordo com o layout recebido.

## Conteúdo

- Visão Geral
  - [Links](https://github.com/Rleopioneer/teste_landing_page/blob/master/README.md#links)
- Meu Processo
  - [Desenvolvido com](https://github.com/Rleopioneer/teste_landing_page/blob/master/README.md#built-with)
  - [O que aprendi](https://github.com/Rleopioneer/teste_landing_page/blob/master/README.md#what-i-learned)
  - [Recursos Úteis](https://github.com/Rleopioneer/teste_landing_page/blob/master/README.md#useful-resources)
- [Autor](https://github.com/Rleopioneer/teste_landing_page/blob/master/README.md#author)

## [Links](https://github.com/Rleopioneer/teste_landing_page/blob/master/README.md#links)

- Live Preview: [GitHub Pages](https://rleopioneer.github.io/teste_landing_page/)

## Meu Processo

### Desenvolvido com

- HTML5
- CSS3
- SASS
- JavaScript

### O que aprendi

Página desenvolvida de acordo com as instruções do teste. 

Utilizei a propriedade *clip-path* para fazer o design do *header*.

```scss
.header {
    height: 30em;
    background-color: $primary-color;
    color: #fff ;
    clip-path: polygon(0% 0, 100% 0, 100% 100%, 0% 75%);
```



As variáveis que armazenam os elementos foram armazenadas dentro de um objeto, poluindo menos o escopo global do documento:

```javascript
const obj= {
    form: document.querySelector('#form'),

    enviar: document.querySelector('#enviar'),

    boxes: document.querySelector('#boxes'),

    newPage: document.querySelector('#newPage'),

    btnNewPage: document.querySelector('#btnNewPage'),

    formShare: document.querySelector('#formShare')
}
```

Validação dos campos de E-mail e CPF do formulário com regex:

```javascript
let inputEmail = document.forms['form']['email']
    let emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!inputEmail.value || !inputEmail.value.match(emailValidation)) {
        hasError = true
        inputEmail.classList.add('error')
        let span = inputEmail.nextSibling.nextSibling
        span.innerText = 'Digite um E-mail válido'
    } else {
        inputEmail.classList.remove('error')
        let span = inputEmail.nextSibling.nextSibling
        span.innerText = ''
    }

    let inputCpf = document.forms['form']['cpf']
    let cpfValidation = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/
         
    if (!inputCpf.value || !inputCpf.value.match(cpfValidation)) {
        hasError = true
        inputCpf.classList.add('error')
        let span = inputCpf.nextSibling.nextSibling
        span.innerText = 'Digite um CPF Válido'
    }  else {
        inputCpf.classList.remove('error')
        let span = inputCpf.nextSibling.nextSibling
        span.innerText = ''
    }
```

API Request é realizada após a validação do formulário:

```js
    if (!temErro) {
        fetch('https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?	page=1').then(toJson).then(buildProductBoxes).catch(errorMsg)
        form.submit()
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
