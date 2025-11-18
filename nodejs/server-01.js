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

// Create an HTTP server that listens for requests and sends a response
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Welcome, this is COSC3060 Server\n');
});

// Start the server and listen on the specified hostname and port for incoming requests
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});