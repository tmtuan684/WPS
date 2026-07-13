const mongoose = require('mongoose');

const db = "userDB";
const connstr = `mongodb+srv://tuantran24:mypassword@cluster0.lberqlg.mongodb.net/${db}?appName=cluster0`;

// Step 1. Connect to DB
mongoose.connect(connstr)
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch((err) => console.log(err.message));

// Step 2. Create Schema and model / MongoDB Collection
const userSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        email: {type: String, unique: true},
        age: Number
});
const User = mongoose.model('User', userSchema);

// Step 3. Add a new 
const newUser = new User({
    firstName: 'Peter',
    lastName: 'John',
    email: 'peter.john@example.com',
    age: 30,
});

newUser.save()
.then((user) => console.log(user))
.catch((error) => console.log(error));