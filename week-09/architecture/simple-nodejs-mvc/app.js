/** 1. Include Package and dependencies */
const express = require('express');
const UserController = require('./controllers/user.controller');
const app = express();
const port = 4000;

// Views
app.set("view engine", "ejs");
app.set("views", "./views");

// Routes + controllers + services
app.get("/", UserController.index);

app.get("/users/:id", UserController.userDetail);

// Start server
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});


