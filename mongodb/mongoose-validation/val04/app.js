/**
 * Match a pattern with match
 * Add a rule to the Customer schema so email must look like a real email address.
 * The below example will result in a validation error: "Customer validation failed: email: Please enter a valid email address." — which means the customer object is not valid to insert as a document in the database because the email field doesn't match a valid email pattern.
 */
const {dbconnect} = require('./dbconnect');
require('dotenv').config({ path: '../.env' });

async function main() {
    const mongoose = await dbconnect(process.env.MONGODB_URI_VAL03);

    // Step 2. Schemas are designed
    const customerSchema = new mongoose.Schema({
        firstName: { type: String, required: true },
        email: {
            type: String,
            required: true,
            match: [/[\w]+@[\w]+\.[a-zA-z]+/, 'Please enter a valid email address.'],
        },
    });
    
    // Step 3. Produce Customer model
    const Customer = await mongoose.model('Customer', customerSchema);

    // Step 4. Define new customer
    const newCustomer = new Customer({
        firstName: 'John',
        email: 'not-an-email',
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