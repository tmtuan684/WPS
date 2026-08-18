require('dotenv').config({ path: '../.env' });

/**
 * 
 * @param {
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
} userdata 
 */
async function createUser(userdata) {
    // Step 1. Connect to DB
    const { dbconnect } = require('./dbconnect');
    const mongoose = await dbconnect(process.env.MONGODB_URI);

    // Step 2 & 3.  Declare to use pre-defined schema and produce collection models
    const { User } = require('./model');

    // Step 4. Made instances and add them to database
    const newUser = new User(userdata);

    const saved = await newUser.save();
    console.log(saved);

    // Step 5. Close database connection
    await mongoose.connection.close();
}

module.exports = { createUser };