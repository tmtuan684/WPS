require('dotenv').config({ path: '../.env' });

async function readUsers() {
    // Step 1. Connect to DB
    const { dbconnect } = require('./dbconnect');
    const mongoose = await dbconnect(process.env.MONGODB_URI);

    // Step 2 & 3.  Declare to use pre-defined schema and produce collection models
    const { User } = require('./model');

    // Step 4. Made instances and add them to database
    const userlist =  await User.find({});
    console.log(userlist);

    // Step 5. Close database connection
    await mongoose.connection.close();
}

readUsers();
module.exports = { readUsers };