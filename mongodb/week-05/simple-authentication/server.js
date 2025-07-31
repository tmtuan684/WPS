/**
 * @description This is an authentication server.
 * @requires the `express`, `mongoose`, and `bcryptjs` packages.
 */

const express = require('express');
const { User } = require('./model');
const bcrypt = require('bcryptjs'); 
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { getConnString } = require('../../dbsupport');

// Session management
const db = "UserAccountDB";
const store = new MongoDBStore({
    uri: getConnString(db),
    collection: 'sessions'
});
store.on('error', function(error) {
    console.error('Session store error:', error.message);
});
// Session middleware
const sessionMiddleware = session({
    secret: 'yourSecretKey', // Replace with your secret key
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 60 * 60 * 1000 // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds
    }
});

// ---- Define server -----//
const app = express();
const host = 'localhost';
const port = 3000;

// Template engine
app.set('view engine', 'ejs');
app.set('views', './views');


// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware)
app.use(express.static("public"));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});
// ------ SIGN UP
// GET - Show registration form
app.get('/sign-up', (req, res) => {
    // Check if user is already logged in
    if (req.session.isLoggedIn) {
        return res.redirect('/profile'); // Redirect to profile page if already logged in
    }
    res.render('sign-up'); // Assuming you have a sign-up.ejs template
});
// POST - Handle registration
app.post('/sign-up', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if either username or passwordr already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

// ------ SIGN IN ------- //
// GET - Show login form
app.get('/sign-in', (req, res) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/profile'); // Redirect to profile if already logged in
    }
    res.render('sign-in'); // Assuming you have a sign-in.ejs template

});
// POST - Handle login 
app.post('/sign-in', async (req, res) => {
    // Get user credentials from request body
    const { username, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }
        // Compare password with hashed password

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }
        // Store user ID in session
        req.session.isLoggedIn = true;
        req.session.user = { id: user._id, username: user.username };
        req.session.save(err => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).send('Internal server error');
            }
        });

        // Successful login
        res.status(302).redirect('/profile'); // Redirect to profile page after successful login    
    } catch (error) {
        console.error(error);           
        res.status(500).send('Internal server error');
    }
});

// GET - Show user profile
app.get('/profile', async (req, res) => {
    // Assuming user is authenticated and user ID is stored in session
    if (!req.session.isLoggedIn) {
        return res.redirect('/sign-in'); // Redirect to sign-in page if not logged in
    }
    const userId = req.session.user.id; // Replace with your session management logic
    if (!userId) {
        return res.redirect('/sign-in'); // Redirect if no user ID in session   
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('profile', { user }); // Assuming you have a profile.ejs template
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

// GET - Logout user

app.get('/sign-out', (req, res) => {
    // Destroy session
    req.session.destroy(err => {
        if (err) {
            console.error('Session destroy error:', err);
            return res.status(500).send('Internal server error');
        }
        res.redirect('/sign-in'); // Redirect to sign-in page after logout
    });
});

app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});
