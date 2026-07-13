const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 7777;

// Middleware cookieParser enables server to read cookie in the request header
app.use(cookieParser());

// CREATE cookie
app.get('/create-cookie', (req, res) => {
    res.cookie('demo', 'HelloWorld', { expires: new Date('2028-12-18'), httpOnly: true });
    res.send('Cookie "demo" has been created!');
});

// READ cookie
// 
app.get('/read-cookie', (req, res) => {
    const value = req.cookies.demo;
    if (value) {
        res.send(`Cookie value: ${value}`);
    } else {
        res.send('Cookie "demo" not found.');
    }
});

// UPDATE cookie
app.get('/update-cookie', (req, res) => {
    res.cookie('demo', 'UpdatedValue', { expires: new Date('2028-12-18'), httpOnly: true });
    res.send('Cookie "demo" has been updated!');
});

// DELETE cookie
app.get('/delete-cookie', (req, res) => {
    res.clearCookie('demo');
    res.send('Cookie "demo" has been deleted!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
