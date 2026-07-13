/**
 * @file simple-server.js
 * @description This is a simple server
 * @date 2025-02-01
 * @example node simple-server.js
 */

// Http protocol to operate this server
const http = require('http');

// Define the hostname and port for the server
const hostname = '127.0.0.1';
const port = 8080;

// Define and Create an HTTP server that listens for requests and sends a response
const server = http.createServer((req, res) => {

  console.log(`Request: ${req.method} ${req.url} ${req.headers.host}`);
  switch (req.url) {
    case '/':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain'); // similar to res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('Welcome, this is COSC3060 Server\n');
      res.end();
      break;
    case '/about':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('This is the about page.\n');
      break;
    case '/contact':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Contact page.\n');
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