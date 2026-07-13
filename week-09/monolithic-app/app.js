/**
 * Monolithic Application: routes + logic + data all in one place
 */

/** 1. Include Package and dependencies */
const express = require('express');
const mongoose = require('mongoose');

/** 2. Initialize express server instance */    
const PORT = 4000;
const app = express();

/** 3. Connect to DBMS and define DB Schema */
const DB="userDB";
const DATABASE_URL=`mongodb+srv://tmtuan:mypassword@cosc3060.rqcqojz.mongodb.net/${DB}?retryWrites=true&w=majority&appName=cosc3060`;
mongoose.connect(DATABASE_URL)
    .then(() => console.log(`Connected to MongoDB Atlas`))
    .catch(err => console.error(`Error connecting to MongoDB Atlas`, err.message));

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

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
    console.log(`Server is listening on http://localhost:${PORT}`);
});


