const express = require('express');
const session = require('express-session');
const app = express();

const host = '0.0.0.0';
const port = 3000;

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUnitialized: true,
    cookie: {maxAge: 600000}
}));

// Define middleware to protect routes
function requireLogin(req, res, next) {
    if (req.session.loggedIn) {
        next(); // User is logged in, proceed
    } else {
        res.send('Please log in first. <a href="login/testaccount">Login</a>');
    }
}

// Routes

app.get('/', (req, res) => {
    res.send(`This server demonstrates protected routes that are only accessible to logged-in users.<p><a href="/public">Visit public page</a></p>`);
})

// Public routes which anyone can access
app.get('/public', (req, res) => {
    res.send('This page is public. Anyone can visit without need for login. <a href="/protected">Try this protected page</a>');
})

// Protected route that requires login
app.get('/protected', requireLogin, (req, res) => {
    res.send(`Welcome, ${req.session.username}! This page is for logged-in users only. 
             <p><a href="/logout">Log out</a></p>`);
})

// Login
app.get('/login/:name', (req, res) => {
    req.session.username = req.params.name;
    req.session.loggedIn = true;
    res.send(`Logged in with name "${req.params.name}". <a href="/protected">Visit protected page.</a>`)
})

//Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged out. <a href="/public">Visit public page</a>');
})

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})