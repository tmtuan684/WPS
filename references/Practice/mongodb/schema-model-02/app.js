const {dbconnect} = require('./dbconnect');
require('dotenv').config({ path: '../.env' });

async function main() {
    // Step 1. Connect to database
    const mongoose = await dbconnect(process.env.MONGODB_URI);
    console.log("App can start now");

    // Step 2. Declare to use pre-defined schema
    const { userSchema, productSchema } = require('./schema');

    // Step 3. Collection models are produced
    const User = mongoose.model('User', userSchema);
    console.log(`User model has been successfully made.`);

    const Product = mongoose.model('Product', productSchema);
    console.log(`Product model has been successfully made.`);
}

main().catch((error) => {
    console.error("Cannot connect to MongDB. The reason is: ", error.message);
    process.exit(1);
});