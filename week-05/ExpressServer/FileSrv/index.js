/**
 * This Node.js application is a simple file server built with Express. It provides multiple HTTP endpoints to deliver different types of content to clients
 */
const express = require('express');
const fs = require('fs');
const app = express();

// Define host
const host = 'localhost';
const port = 3000;

// Define server
/**  GET / 
 * Returns a basic text message as the index page. */
app.get('/', (req, res) => {
    res.send("This is index page");
});
/** GET /products
* Reads and returns the contents of products.json using fs.readFileSync(). This endpoint is suitable for serving small JSON data. */
app.get('/products', (req, res) => {
    const data = fs.readFileSync('products.json', 'UTF-8');
    res.send(data);
});
/** GET /photo
Streams a JPEG image (photo.jpg) to the client using fs.createReadStream(). This approach is memory-efficient and ideal for serving large media files. */
app.get('/photo', (req, res) => {
    const st = fs.createReadStream('photo.jpg');
    res.writeHead(200, {'Content-Type':'image/jpeg'});
    st.pipe(res);
})
/** GET /ebook
* Streams a PDF file (ebook.pdf) to the client, also using createReadStream() for efficient data transfer. */
app.get('/ebook', (req, res) => {
    const st = fs.createReadStream('ebook.pdf');
    res.writeHead(200, {'Content-Type':'application/pdf'});
    st.pipe(res);
})

// Run server
app.listen(port, host, () => {
    console.log(`File server is running at http://${host}:${port}`);
})