const {dbconnect} = require('./dbconnect');
require('dotenv').config({ path: '../.env' });

async function main() {
    // Step 1. Connect to database
    const mongoose = await dbconnect(process.env.MONGODB_URI_UserProduct);

    // Step 2 & 3.  Declare to use pre-defined schema and produce collection models
    const { User, Product } = require('./model');

    // Step 4. Made instances and add them to database
    const newUser = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        age: 30,
    });

    newUser.save()
            .then((user) => console.log(user))
            .catch((error) => console.log(error));

    const newProduct = new Product({
            name: 'Sample Product',
            price: 100,
            category: 'Electronics',
        });

    newProduct.save()
                .then((product) => console.log(product))
                .catch((error) => console.log(error));
}

main().catch((error) => {
    console.error("Cannot connect to MongDB. The reason is: ", error.message);
    process.exit(1);
});