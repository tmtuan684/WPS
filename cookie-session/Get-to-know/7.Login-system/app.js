const express = require('express');
const session = require('express-session');
const app = express();

const host = '0.0.0.0';
const port = 3000;

// Define middlewares
app.use(express.urlencoded({extended: true})); // Processes form data
app.use(session({
    name: 'my-session-id',  // Change the name of session id cookie from the default connect.sid to this
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000}
}))

function requireLogin(req, res, next) {
    if(req.session.loggedIn) {
        next();
    } else {
        res.send('Please log in first. <a href="/login">Login</a>');
    }
}

// Sample users
const users = {
    John: {password: 'john-pwd', email: 'john@email.com'},
    Peter: {password: 'peter-pwd', email: 'peter@email.com'}
};

// Step 1. Register page
app.get('/register', (req, res) => {
    res.send(`<h1>Register</h1>
            <form method="POST" action="/register">
                <input type="text" name="username" placeholder="Username" required><br>
                <input type="email" name="email" placeholder="Email" required><br>
                <input type="password" name="password" placeholder="Password" required><br>
                <button type="submit">Register</button>
            </form>`);
})

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if(users[username]) {
        res.send('User already exists. <a href="/register">Please try again.</a>');
    } else {
        users[username] = { password, email}; // same result as users[username].password = password; users[username].email = email
        res.send(`User "${username}" has been successfully registered! <a href="/login">Login here</a>`);
    }
});

// Step 2. Login 
app.get('/login', (req, res) => {
    res.send(`<h1>Login</h1>
        <form method="POST" action="/Login">
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit">Login</button>
            </form>`);
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    if(users[username] && users[username].password === password) {
        req.session.loggedIn = true;
        req.session.username = username;
        res.send(`Welcome, ${username}! <a href="/dashboard">Go to dashboard</a>`);
    } else {
        res.send('Invalid username or password. <a href="/login">Try again</a>');
    }
})

// Step 3. Dashboard
app.get('/dashboard', requireLogin, (req, res) => {
    res.send(`<h1>Dashboard</h1>
        <p>Welcome, ${req.session.username}!</p>
        <p>Email: ${users[req.session.username].email}</p>
        <br><a href="/logout">Logout</a>`);
})

// Step 4. Logout
app.get('/logout', (req, res) => {
    req.session.
    req.session.destroy();
    res.clearCookie();
    res.send(`Logged out. 
        <p><a href="/login">Log in</a></p>
        <p><a href="/">Home</a></p>`);
})

// Home
app.get('/', (req, res) => {
    if(req.session.loggedIn) {
        res.send(`Welcome back, ${req.session.username}
                <p><a href="/dashboard">Dashboard</a> | <a href="/logout>Logout</a></p>`);
    } else {
        res.send('<a href="/login">Login</a> | <a href="/register">Register</a>')
    }
})

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})