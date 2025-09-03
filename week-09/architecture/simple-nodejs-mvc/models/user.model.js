/** 3. Connect to DBMS and define DB Schema */
const mongoose = require('mongoose');

const DB="userDB";
const DATABASE_URL=`mongodb+srv://tmtuan:mypassword@cosc3060.rqcqojz.mongodb.net/${DB}?retryWrites=true&w=majority&appName=cosc3060`;

mongoose.connect(DATABASE_URL)
    .then(() => console.log(`Connected to MongoDB Atlas`))
    .catch(err => console.error(`Error connecting to MongoDB Atlas`, err.message));

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };


