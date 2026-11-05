const http = require('http');
 
const Servidor = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Servidor rodando');
});

Servidor.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
});