const {dbconnect} = require('./dbconnect');
require('dotenv').config({ path: '../.env' });

async function main() {
    // Step 1. Connect to database
    const mongoose = await dbconnect(process.env.MONGODB_URI);
    console.log("App can start now");

    // Step 2 & 3.  Declare to use pre-defined schema and produce collection models
    const { User, Product } = require('./model');

    // Step 4. Made instances and add them to database
    const newUser = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        age: 30,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    const newProduct = new Product({
            name: 'Sample Product',
            price: 100,
            category: 'Electronics',
        });

    const savedProduct = await newProduct.save();
    console.log(savedProduct);
}

main().catch((error) => {
    console.error("Cannot connect to MongDB. The reason is: ", error.message);
    process.exit(1);
});