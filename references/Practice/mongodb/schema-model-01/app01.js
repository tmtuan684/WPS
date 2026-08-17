const {dbconnect} = require('./dbconnect');
require('dotenv').config({ path: '../.env' });

async function main() {
    const mongoose = await dbconnect(process.env.MONGODB_URI);
    console.log("App can start now");

    // Step 2. Schemas are designed
    const userSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        email: { type: String, unique: true },
        age: Number,
    });
    const productSchema = new mongoose.Schema({
        name: String,
        price: Number,
        category: String,
    });

    // Step 3. Collection models are produced
    const User = mongoose.model('User', userSchema);
    console.log(`${User.ti} model has been successfully made.`);
    const Product = await mongoose.model('Product', productSchema);
    console.log(`${Product.schema.obj} model has been successfully made.`);
}

main().catch((error) => {
    console.error("Cannot connect to MongDB. The reason is: ", error.message);
    process.exit(1);
});