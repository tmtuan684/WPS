const express = require('express');
const session = require('express-session');
const app = express();

const host = '0.0.0.0';
const port = 3000;

// Use Middleware
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 10000} // session lasts 10 seconds
}));

//Routes
app.get('/', (req, res) => {
    res.send('This server demonstrates the lifecycle of a web session.');
})
// Login and see session ID
app.get('/login/:name', (req, res) => {
    req.session.username = req.params.name;
    req.session.loginTime = new Date();
    res.send(`<b>Welcome, ${req.params.name}</b>
              <br>Session ID: ${req.sessionID}
              <br>Your session will expire in 10 seconds
              <br><a href="/session-info">View session info</a>`);
})

//View session info after logged in
app.get('/session-info', (req, res) => {
    if(!req.session.username) {
        res.send('No active session. <a href="/login">Login</a>')
    } else {
        res.send(`<h1>Session Info</h1>
                  <p>Session ID: ${req.sessionID}</p>
                  <p>Username: ${req.session.username}</p>
                  <p>Login time: ${req.session.loginTime}</p>
                  <p>Session expires in <strong>10 seconds</strong></p>
                  <p><a href="/logout">Log out</p>`);
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Session ended. <a href="/login/testaccount">Login again</a>');
})

app.listen(port, host, () => {
    console.log(`Server is running http://${host}:${port}`);
})