const express = require('express');
const session = require('express-session');
require('dotenv').config();
const app = express();

//Configuration
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.use(session({
    name: 'userSID',
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, httpOnly: true, maxAge: 60 * 60 * 24}

}));
// Routes
app.get('/', (req, res) => {
    res.send('Login System with Session management');
})

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/submitlogin', (req, res) => {
    const user = {name: req.body.username,
                  password: req.body.password,
                  remember: req.body.remember
    };
    if(user.name === 'student' && user.password === 'StudPwd') {
        req.session.user = user.name;
        req.session.isLoggedIn = true;
        res.redirect(`/user/${user.name}`);
        if (user.remember) {
      // persist for 7 days (milliseconds)
      req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
        } else {
        // session cookie (expires when browser closes)
        req.session.cookie.expires = false;
        req.session.cookie.maxAge = null;
        }
    } 
    else {
        res.redirect('/login');
    }
});

app.get('/user/:username', (req, res) => {
    const username = req.params.username;
    res.render('user', {username: username});
});

app.get('/dashboard', (req, res) => {
    if(req.session.isLoggedIn) {
        res.render('dashboard', { user: req.session.user});
    }
    else {
        res.redirect('/login');
    }
});

app.post('/logout', (req, res) => {
  if (!req.session) return res.redirect('/login');

  req.session.destroy(function(err) {
    if (err) {
      console.error('session destroy error', err);
      return res.status(500).send('Error deleting session.');
    }
    res.clearCookie('userSID');
    return res.redirect('/login');
  });
});

const host = process.env.HOST;
const port = process.env.PORT || 5000;
app.listen(port, host, () => {
    console.log(`Server is listenning at http:${host}:${port}`);
});

