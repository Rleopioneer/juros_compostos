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

console.log("Hello World")

const name = document.querySelector('#name')

console.log(name)