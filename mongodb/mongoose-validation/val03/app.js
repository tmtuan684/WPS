/**
 * Restrict values with enum
 * Add a rule to the Drink schema so category only accepts 'Coffee', 'Milk Tea', or 'Fruit Tea'.
 * Handle the validation error using a try-catch block during the save operation.
 * The below example will result in a validation error: "Drink validation failed: category: Soda is not a valid enum value for path category." — which means the drink object is not valid to insert as a document in the database because 'Soda' isn't one of the allowed categories.
 */
const {dbconnect} = require('./dbconnect');
require('dotenv').config({ path: '../.env' });

async function main() {
    const mongoose = await dbconnect(process.env.MONGODB_URI_VAL03);

    // Step 2. Schemas are designed
    const drinkSchema = new mongoose.Schema({
        name: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, enum: ['Coffee', 'Milk Tea', 'Fruit Tea'] },
    });
    
    // Step 3. Produce Customer model
    const Drink = await mongoose.model('Drink', drinkSchema);

    // Step 4. Define new customer
    const newDrink = new Drink({
        name: 'Cola Float',
        price: 25000,
        category: 'Soda',
    });

    // Step 5. Validate and add the customer to database
    try {
        await newDrink.save();
        console.log('Drink saved successfully');
    } catch (err) {
        console.error('Validation error:', err.message);
    } finally {
        process.exit(1);
    }
}

main().catch((error) => {
    console.error("Cannot connect to MongDB. The reason is: ", error.message);
    process.exit(1);
});