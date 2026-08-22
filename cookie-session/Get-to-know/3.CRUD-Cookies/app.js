const cookieParser = require('cookie-parser');  // to access and manage cookies sent by the client in the request header
const express = require('express');
const app = express();

const host = '0.0.0.0';
const port = 3000;

// Middleware
app.use(cookieParser());
// Routes
app.get('/', (req, res) => {
    res.send('This server demonstrates CRUD Cookies');
})

// Create a cookie
app.get('/cookie/create/:name/:value', (req, res) => {
    res.cookie(req.params.name, req.params.value);
    res.send(`Cookie ${req.params.name}:${req.params.value} has just been created.`);
})
// Read all cookies that the browser contains 
app.get('/cookie/read', (req, res) => {
    console.log(req.cookies);
    res.json(req.cookies);
})
// Update a cookie's value
app.get('/cookie/update/:name/:value', (req, res) => {
    res.cookie(req.params.name, req.params.value);  // To update a cookie is to overwrite it with a new value
    res.send(`Cookie "${req.params.name}"y has a new value: ${req.params.value}`);
})
// Delete a cookie
app.get('/cookie/delete/:name', (req, res) => {
    res.clearCookie(req.params.name);
    res.send(`Cookie "${req.params.name}" has been deleted."`);
})

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})