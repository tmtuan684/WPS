require('dotenv').config({ path: '../.env' });

async function readProducts() {
    // Step 1. Connect to DB
    const { dbconnect } = require('./dbconnect');
    const mongoose = await dbconnect(process.env.MONGODB_URI);

    // Step 2 & 3.  Declare to use pre-defined schema and produce collection models
    const { Product } = require('./model');

    // Step 4. Made instances and add them to database
    const productlist =  await Product.find({});
    console.log(productlist);

    // Step 5. Close database connection
    await mongoose.connection.close();
}

readProducts();

module.exports = { readProduct };