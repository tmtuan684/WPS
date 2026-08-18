require('dotenv').config({ path: '../.env' });

async function deleteUser() {
    // Step 1. Connect to DB
    const { dbconnect } = require('./dbconnect');
    const mongoose = await dbconnect(process.env.MONGODB_URI);

    // Step 2 & 3.  Declare to use pre-defined schema and produce collection models
    const { User } = require('./model');

    // Step 4. Find the first user that matches 1st parameter and delete it 
    const deleted =  await User.deleteOne({email: 'john.doe@example.com'});
    console.log(deleted);

    // Step 5. Close database connection
    await mongoose.connection.close();
}

deleteUser();
module.exports = { deleteUser };