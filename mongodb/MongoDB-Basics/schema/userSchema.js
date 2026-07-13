const { mongoose } = require('../dbconnect/dbconnect');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    age: Number
});

if (userSchema) {
    console.log(`User Schema is created`);
}

const User = mongoose.model('User', userSchema);

if (User) {
    console.log(`User model is created`);
}
module.exports = { User };