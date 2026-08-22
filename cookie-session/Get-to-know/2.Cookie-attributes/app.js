const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const host = '0.0.0.0';
const port = 3000;

// User Middleware
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('This server sends different cookies.')
})

app.get('/set-session-cookie', (req, res) => {
    res.cookie('sessionCookie', 'i-expire-on-close');
    res.send('Session cookie expires when closing the browser.');
});

app.get('/set-persistent-cookie', (req, res) => {
    res.cookie('persistent', 'i-last-7-days', { maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.send('Persistent cookie that last 7 days');
});

app.get('/set-unsecure-cookie', (req, res) => {
    res.cookie('unsecure', 'unsecure-cookie', {httpOnly: true, secure: false});
    res.send('Secure cookie is only sent over HTTPs protocol');
})

app.get('/set-secure-cookie', (req, res) => {
    res.cookie('secure', 'secure-cookie', {httpOnly: true, secure: true});
    res.send('Secure cookie is only sent over HTTPs protocol');
})

// View all cookies
app.get('/cookies', (req, res) => {
    res.json(req.cookies);
})

//Delete cookie
app.get('/delete-cookie/:name', (req, res) => {
    res.clearCookie(req.params.name);
    res.send(`Cookie "${req.params.name}" was deleted.`)
})

app.listen(port, host, () => console.log(`Server is running on http://${host}:${port}`));