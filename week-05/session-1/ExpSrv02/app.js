const express = require('express');
const fs = require('fs');
const app = express();

const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`
                <html>
                <head>
                <link rel="stylesheet" href="/css/styles.css">
                </head>
                <body>
                <h1>Static Pages!</h1>
                </body>
                </html>
                `);
})
app.get('/index', (req, res) => {
    const page = fs.readFileSync(__dirname + '/public/html/index.html', 'utf-8');
    res.send(page);
})
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
})