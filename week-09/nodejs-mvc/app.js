// Simple Fullstack app to sign up for an account with profile picture
const express = require('express');
require('./config/env.config');
const { homeRouter } = require('./routes/home.routes'); 
const app = express();
const port = process.env.PORT || 8000;

// Views
app.set("view engine", "ejs");
app.set("views", "./views");

// Routes
app.use("/", homeRouter);
app.use("/users/:id", homeRouter);

// Start server
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});


