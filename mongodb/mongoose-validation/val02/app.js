/**
 * Enforce a length range with minlength and maxlength
 * Add a rule to the Drink schema so name must be at least 2 characters and no more than 40.
 * Handle the validation error using a try-catch block during the save operation.
 * The below example will result in a validation error: "Drink validation failed: name: Path name (A, length 1) is shorter than the minimum allowed length (2)." — which means the drink object is not valid to insert as a document in the database because its name is too short.
 */
const {dbconnect} = require('./dbconnect');
require('dotenv').config({ path: '../.env' });

async function main() {
    const mongoose = await dbconnect(process.env.MONGODB_URI_VAL01);

    // Step 2. Schemas are designed
    const customerSchema = new mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: String,
        email: { type: String, required: true, unique: true },
        age: { type: Number, min: 13, max: 45 },
    });
    
    // Step 3. Produce Customer model
    const Customer = await mongoose.model('Customer', customerSchema);

    // Step 4. Define new customer
    const newCustomer = new Customer({
        firstName: 'Minh',
        email: 'minh.underage@example.com',
        age: 15,
    });

    // Step 5. Validate and add the customer to database
    try {
        await newCustomer.save();
        console.log('Customer saved successfully');
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