const cookieParser = require('cookie-parser');  // Use cookie-parser for manage cookie-session operations 
const express = require('express'); // Use express package for server's features
const app = express();  // Construct an express web server

//Define the server
const host='localhost';
const port=4000;

// Use middleware
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('This server demonstrates basic use of Web Cookies techniques.');
})
app.get('/set-cookies', (req, res) => {
    res.cookie('username', 'John Peter', {maxAge: 60000}); // this cookie expires in 60 seconds
    res.send('Cookie is set! Check your browser DevTools to view it.');
})

app.get('/read-cookies', (req, res) => {
    console.log(`Cookies received: ${req.cookies.username}`);
    res.json(req.cookies);
})

app.listen(port, host, () => {
    console.log(`Server is runnning on http://${host}:${port}`);
})

// Note. Cookie is deleted when the server stops.