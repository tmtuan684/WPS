/**
 * @file server-w-htmlpages.js
 * @description This server responds with Boostrap HTML pages for different routes.
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
    case '/projects':
      const aboutPage = fs.readFileSync('projects.html', 'utf8');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(aboutPage);
      break;
    case '/contact':
      const contactPage = fs.readFileSync('contact.html', 'utf8');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(contactPage);
      break;
    case '/resume':
      const resumePage = fs.readFileSync('resume.html', 'utf8');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(resumePage);
      break;  
    default:
     const fileNotFoundPage = fs.readFileSync('404.html', 'utf8');
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end(fileNotFoundPage);
  }
});

// Start the server and listen on the specified hostname and port for incoming requests
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function fname(para1, para2) {
  // define your function here
}

(para1, para2) => {

}

function serverStatus()  {
  console.log(`Server running at http://${hostname}:${port}/`);
}