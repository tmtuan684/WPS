/**
 * 
 * @param {
    name: String,
    price: Number,
    category: String,
} productdata 
 */
async function createProduct(productdata) {
    // Step 1. Connect to DB
    const { dbconnect } = require('../create-data-03/dbconnect');
    const mongoose = await dbconnect(process.env.MONGODB_URI);

    // Step 2 & 3.  Declare to use pre-defined schema and produce collection models
    const { Product } = require('../create-data-03/model');

    // Step 4. Made instances and add them to database
    const newProduct = new Product(productdata);

    const saved = await newProduct.save();
    console.log(saved);

    // Step 5. Close database connection
    await mongoose.connection.close();
}

module.exports = { createProduct };