/**
 * The below example will result in a validation error: "Drink validation failed: name: Path name (A, length 1) is shorter than the minimum allowed length (2)." — which means the drink object is not valid to insert as a document in the database because its name is too short.
 */
const {dbconnect} = require('./dbconnect');
require('dotenv').config({ path: '../.env' });

async function main() {
    const mongoose = await dbconnect(process.env.MONGODB_URI_VAL02);

    // Step 2. Schemas are designed
    const drinkSchema = new mongoose.Schema({
        name: { type: String, required: true, minlength: 2, maxlength: 40 },
        price: { type: Number, required: true },
        category: String,
    });
    
    // Step 3. Produce Customer model
    const Drink = await mongoose.model('Drink', drinkSchema);

    // Step 4. Define new customer
    const newDrink = new Drink({
        name: 'A',
        price: 20000,
    });

    // Step 5. Validate and add the customer to database
    try {
        await newDrink.save();
        console.log('Drink saved successfully');
    } catch (err) {
        console.error('Validation error:', err.message);
    }
}

main().catch((error) => {
    console.error("Cannot connect to MongDB. The reason is: ", error.message);
    process.exit(1);
});