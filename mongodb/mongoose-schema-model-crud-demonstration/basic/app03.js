const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env'});

async function main() {
        // Step 1. Connect to Database
        await mongoose.connect(process.env.MONGODB_URI_UserProduct);
        console.log('Connected to MongoDB Atlas');

        //Step 2. Define Schema
        const userSchema = new mongoose.Schema({
                firstName: String,
                lastName: String,
                email: {type: String, unique: true},
                age: Number
        })

        // Step 3. Produce model
        const User = mongoose.model('User', userSchema);

        // Step 4. Add data to Database
        const newUser = new User({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                age: 30,
        });

        newUser.save()
        .then((user) => console.log(user))
        .catch((error) => console.log(error));


}
main().catch((error) => {
        console.log(error.message);
        process.exit(1);
})