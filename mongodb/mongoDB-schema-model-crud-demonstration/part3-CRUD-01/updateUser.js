require('dotenv').config({ path: '../.env' });

async function updateUser() {
    // Step 1. Connect to DB
    const { dbconnect } = require('./dbconnect');
    const mongoose = await dbconnect(process.env.MONGODB_URI);

    // Step 2 & 3.  Declare to use pre-defined schema and produce collection models
    const { User } = require('./model');

    // Step 4. Find the first user that matches 1st parameter and update it with the value in the 2nd parameter 
    const updated =  await User.updateOne({email: 'john.doe@example.com'}, { age: 40 });
    console.log(updated);

    // Step 5. Close database connection
    await mongoose.connection.close();
}

updateUser();
module.exports = { updateUser };