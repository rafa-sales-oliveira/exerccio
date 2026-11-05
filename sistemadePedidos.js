//importa o modulo nativo http do node.js
const http = require('http');

// criamos um array/vetor para simular 
let pizzaria = [
    {
        id: 1,
        cliente: 'rafael sales oliveira',
        pedido: 'pizza de catupiry',
        valor: "R$:60,00"
    }
];

const server = http.createServer((req, res) =>{
// capturmaos o methodo (get, post, put, delete, etc)
const metodo = req.method;
//captura a url da requisição(rotas)
const url = req.url;
// define que a resposta sera em json
res.setHeader('content-Type', 'application/json')


if(url === '/pizzaria' && metodo === 'GET'){
    // status 200 = ok/ sucesso
    res.statusCode = 200;
    // retornamos a lista de livros em formato
    res.end(JSON.stringify(pizzaria));
    //encerra a execução de requisição
    
    return;
}
//post criar livro
if(url === '/pizzaria' && metodo === 'POST'){
    // variavel para armazenar os dados vindo do body
    let body = '';
    // evento disparado quando chegam os 'pedaços' chegarem
    req.on('data', parte =>{
        body += parte // contatena os pedaços
    });
    req.on('end', ()=>{
        // coverte o json recebido em objeto javascript
        const novopizzaria = JSON.parse(body);
        // adciona o novo livro ao array livros
        pizzaria.push(novopizzaria);
        // status 201 = criado com sucesso
        res.statusCode = 201;
        // retorna mensagem final + objeto criado
        
        res.end(JSON.stringify({
            mensagem: 'pedido cadastrado com sucesso',
            pizzaria: novopizzaria

        }));
    });


    return;
}
// put atualizar livro
if(url === '/pizzaria' && metodo === 'PUT'){
    let body = '';
    req.on('data', parte =>{
        body += parte;

    });
    req.on('end', ()=>{
        // dados atualizados vindos do usuario
        const pizzariaAtualizado = JSON.parse(body);
        // percorre a lista de e substitui o livro que tem o mesmo id
        pizzarias = pizzarias.map(pizzaria =>{
            // se encontrar o mesmo id, substitui
            if(pizzaria.id === pizzariaAtualizado.id){
                return pizzariaAtualizado;
            }
            // caso contrario, mantenho todos os originais
            return pizzaria;
        });
        res.statusCode = 200;
        res.end(JSON.stringify({
            mensagem: 'pedido atualizado com sucesso',
            pizzarias:pizzarias
        }))
    })
    return;
}
if(url === '/pizzaria' && metodo === 'DELETE'){
    let body ='';
    req.on('data', parte =>{
        body += parte;

    });
    req.on('end', () =>{
        // recebe o id do  a ser excluido
        const dados = JSON.parse(body);
        // filtro o array removendo o com id igual ao informado
        pizzarias = pizzaria.filter(pizzaria => pizzaria.id !== dados.id);
        res.statusCode = 200;
        res.end(JSON.stringify({
            mensagem: 'pedido removido com sucesso',
            pizzarias:pizzarias

    }))

    })
    return;
}
res.statusCode = 404;
res.end(JSON.stringify({
    mensagem: 'rota não encontrada'
}))



});

server.listen(3000, ()=>{
    console.log('http://localhost:3000')
});
