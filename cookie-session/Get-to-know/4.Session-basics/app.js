const session = require('express-session');
const express = require('express');
const app = express();

const host = '0.0.0.0';
const port = 3000;

// Define session middleware and configure sessions
app.use(session({
    secret: 'my-secret-key', // To encrypt the session ID that is stored in the user browser cookie
    resave: false,           // Session data will only be save if modified; set to true by default
    saveUninitialized: true, // Session is automatically save when session is new or not modified.
    cookie: {maxAge: 60000} // Session lasts 60 seconds
}));

app.get('/', (req, res) => {
    res.send('This server demonstrates how server session operates.');
})
//Create (set) session data
app.get('/login/:username', (req, res) => {
    req.session.username = req.params.username;
    req.session.loggedIn = true;
    res.send(`A new session is created for user "${req.session.username}`);
})

//Read (get) session data
app.get('/profile', (req, res) => {
    if(req.session.loggedIn) {
        res.send(`Welcome, ${req.session.username}`);
    } else {
        res.send('Not logged in. Please visit login/yourname.');
    }
})

// Delete (destroy) session
app.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) res.send('Logout failed. The issue is', error);
        else res.send('Logged out.');
    })
})

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
}) 