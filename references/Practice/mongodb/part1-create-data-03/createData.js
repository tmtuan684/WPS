require('dotenv').config({ path: '../.env' });

async function createData() {
    // Step 1. Connect to DB
    const { dbconnect } = require('./dbconnect');
    const mongoose = await dbconnect(process.env.MONGODB_URI);

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

    // Step 5. Closing database connection
    await mongoose.connection.close();
    console.log('Done with database access. Connection closed.');
    
}

createData().then(() => {
    console.log("New data have been successfully added to database.")
})
.catch((error) => {
    console.log("Data were not added to database. The reason is ",error.message);
});
