// configurando projeto
const express = require('express')
const app = express()
const port = 3000

// middlewares
app.use(express.json())

// lógica -> contrato
app.get('/hello', (req, res) => {
    res.send("Hello World")
})

// 1. Faça uma api para calcular o estoque médio de uma peça, sendo que ESTOQUE MÉDIO = (QUANTIDADE MÍNIMA + QUANTIDADE MÁXIMA) /2.
app.post('/exercicio1', (req, res) => {
    const corpo = req.body
    console.log(corpo)

    const estoqueMedio = (corpo.quantidadeMinima + corpo.quantidadeMaxima) / 2

    const resposta = {
        peca: corpo.peca,
        estoqueMedio: estoqueMedio
    }

    res.json(resposta)
})

/* 2. Uma empresa decide dar um aumento de 30% aos funcionários cujo salário é inferior a 1.000 reais. 
Escreva uma API que receba o salário de um funcionário e imprima o valor do salário reajustado 
ou uma mensagem caso o funcionário não tenha direito ao aumento. */

app.post('/exercicio2', (req, res) => {
    const salario = req.body.salario;

    if (salario < 1000) {
        const novoSalario = salario * 1.3; 
        res.json({ "novoSalario": novoSalario });
    } else {
        res.json({ "mensagem": "Funcionário não tem direito ao aumento." });
    }
})

/* 3. Escrever uma API que lê o nome de um vendedor, o seu salário fixo, 
o total de vendas por ele efetuadas e o percentual que ganha sobre o total de vendas. 
Calcular o salário total do vendedor. Escrever o nome do vendedor e seu salário total. */

app.post('/exercicio3', (req, res) => {
    const { nome, salarioFixo, totalVendas, percentualComissao } = req.body;

    const comissao = totalVendas * (percentualComissao / 100);
    const salarioTotal = salarioFixo + comissao;

    res.json({ "nome": nome, "salarioTotal": salarioTotal });
})

/* 4. Faça uma API que leia o nome de um piloto, uma distância percorrida em km e o tempo que o piloto levou para percorrê-la (em horas). 
O programa deve calcular a velocidade média - Velocidade = Distância / Tempo - em km/h, 
e exibir a seguinte frase: A velocidade média do <nome do piloto> foi <velocidade media calculada> km/h. */

app.post('/exercicio4', (req, res) => {
    const { nomePiloto, distanciaPercorrida, tempoPercorridoHoras } = req.body;

    const velocidadeMedia = distanciaPercorrida / tempoPercorridoHoras;

    res.json({ "mensagem": `A velocidade média do ${nomePiloto} foi ${velocidadeMedia} km/h.` });
})

/* 7. Faça uma api para ler o código e o preço de 15 produtos, calcular e escrever:
    • O maior preço lido; e
    • A média aritmética dos preços dos produtos.
 */

app.post('/exercicio7', (req, res) => {
    let listaProdutos = []

    req.body.forEach(produto => {
        listaProdutos.push(produto)
    });

    let maiorPrecoLido = 0
    listaProdutos.forEach(produto => {
        if (produto.preco > maiorPrecoLido){
            maiorPrecoLido = produto.preco
        }
    })

    let soma = 0
    console.log("soma ", soma)
    listaProdutos.forEach(produto => {
        console.log("produto preco ", produto.preco)
        soma = soma + produto.preco
        console.log("soma ", soma)
    })

    let media = soma / listaProdutos.length

    res.json({
        maiorPrecoLido: maiorPrecoLido,
        media: media.toFixed(2)
    })
})




// start da aplicaão na porta definida
app.listen(port, () => {
    console.log("Aplicação iniciada em http://localhost:3000")
})