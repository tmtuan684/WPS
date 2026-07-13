require('../config/env.config');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log(`Connected to MongoDB Atlas`))
    .catch(err => console.error(`Error connecting to MongoDB Atlas`, err.message));

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
