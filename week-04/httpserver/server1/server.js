const { createReadStream } = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    // define routes and response
    const responseText = (res, status, content) => {
        res.writeHead(status, {'Content-Type': 'text/plain'});
        res.end(content);
    }
    const responseHTML = (res, status, htmlfile) => {
        res.writeHead(status, {'Content-Type': 'text/html'});
        createReadStream(htmlfile).pipe(res);
    }
    switch (req.url) {
        case '/': 
            return responseHTML(res, 200, 'index.html'); 
        case '/about':
            return responseHTML(res, 200, 'about.html');
        case '/contact':
            return responseHTML(res, 200, 'contact.html');
        default:
           return responseText(res, 404, "File not found");
         
    }
});
server.listen(3000, 'localhost', () => {
    console.log(`Server is running at http://localhost:3000`);
})
