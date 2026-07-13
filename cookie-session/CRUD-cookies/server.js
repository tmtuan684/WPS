const express = require('express');  // declare usage of express package and assign express library to const variable server
const app = express();  // Initialize express server object and assign it to const variable app; app is a reference variable holding address of the express server object

const port = 7777;
app.get('/set-cookie', (req, res) => {
    document.cookie = "user=John Doe; expires=Thu, 18 Dec 2028 12:00:00 UTC; path=/";
    res.send('Cookie has been set');
});

app.get('/get-cookie', (req, res) => {
    const userCookie = req.cookies.user; // Accessing the 'user' cookie
    if (userCookie) {
        res.send(`Cookie Value: ${userCookie}`);
    } else {
        res.send('Cookie not found');
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('user'); // Deleting the 'user' cookie
    res.send('You have been logged out');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});