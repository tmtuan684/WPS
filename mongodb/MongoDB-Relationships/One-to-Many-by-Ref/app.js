require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI_OMR);

    if (mongoose.connection.readyState == 1) {
        console.log('Connected to MongoDB Atlas');

        const userSchema = new mongoose.Schema({
            name: String,
            address: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Address'
            }]
        });

        const addressSchema = new mongoose.Schema({
            number: String,
            street: String,
            city: String,
            zipcode: String,
            country: String
        });

        const User = mongoose.model('User', userSchema);
        const Address = mongoose.model('Address', addressSchema);

        const address1 = new Address({
            number: '123',
            street: 'Golden street',
            city: 'ABC',
            zipcode: '200000',
            country: 'DEF'
        });

        const address2 = new Address({
            number: '456',
            street: 'Silver street',
            city: 'ABC',
            zipcode: '12345678',
            country: 'DEF'
        });

        await address1.save();
        await address2.save();

        const newUser = new User({
            name: 'Mathew',
            address: [address1._id, address2._id]
        });

        const savedUser = await newUser.save();
        console.log('Document saved:', savedUser);
        await mongoose.connection.close();
    }
    else {
        console.log("Cannot connect to MongoDB");
    }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
