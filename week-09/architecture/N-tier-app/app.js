/**
 * 2-tier Application: server + model
 */

/** 1. Include Package and dependencies */
const express = require('express');
const { User } = require('./models');
/** 2. Initialize express server instance */    
const PORT = 4000;
const app = express();

/** 4. Declare view templates */
app.set("view engine", "ejs");
app.set("views", "./views");

/** 5. Declare middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** 6. Define routes + controllers + services */
app.get("/", (req, res) => {
    User.find({})
        .then(users => {
            res.render("index", { users });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
        });
});
app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).send("User not found");
            }
            res.render("userDetail", { user });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
        });
});

/** 7. Start server */
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT }`);
});


