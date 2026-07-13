/**
 * @file server-w-htmlpages.js
 * @description This server responds with predefined HTML pages for different routes.
 * @date 2025-02-01
 * @example node server-w-htmlpages.js
 */


const http = require('http'); // Http protocol to operate this server
const fs = require('fs'); // fs to read HTML files

// Define the hostname and port for the server
const hostname = '127.0.0.1';
const port = 8080;

// Define and Create an HTTP server that listens for requests and sends a response
const server = http.createServer((req, res) => {

  console.log(`Request: ${req.method} ${req.url} ${req.headers.host}`);
  switch (req.url) {
    case '/':
    case '/index':
      const indexPage = fs.readFileSync('./html-pages/index.html', 'utf8');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html'); // similar to res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(indexPage);
      break;
    case '/about':
      const aboutPage = fs.readFileSync('./html-pages/about.html', 'utf8');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(aboutPage);
      break;
    case 'contact':
      const contactPage = fs.readFileSync('./html-pages/contact.html', 'utf8');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(contactPage);
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('This web page does exist\n');
  }
});

// Start the server and listen on the specified hostname and port for incoming requests
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});