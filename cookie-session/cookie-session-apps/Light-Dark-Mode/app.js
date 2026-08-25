const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Define this server
const host = '0.0.0.0';
const port = 3000;

// Middlewares
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    const theme = req.cookies.theme || 'light';
    const bg = (theme === 'dark') ? '#1B1B1D' : '#FAF8F4';
    const fg = (theme === 'dark') ? '#FAF8F4' : '#1B1B1D';
    res.send(`<body style="background: ${bg}; color: ${fg};">
                <h1>This application can present in either light mode or dark mode.</h1>
                <p>Current theme: ${theme}</p>
                <p>Switch theme: <a href="/theme/light" style="background: ${bg}; color: ${fg};">Light</a> | <a href="/theme/dark" style="background: ${bg}; color: ${fg};">Dark</a></p> 
        </body>`);
});

app.get('/theme/:mode', (req, res) => {
    const mode = req.params.mode === 'dark' ? 'dark': 'light';
    res.cookie('theme', mode, {maxAge: 365 * 24 * 60 * 60 * 1000});
    res.redirect('/');  // Open home page
});


// Run the server 
app.listen(port, host, () => console.log(`Server is running on http://${host}:${port}`));