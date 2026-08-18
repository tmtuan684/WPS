require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI_OOR);
  
    if(mongoose.connection.readyState == 1) {
        console.log('Connected to MongoDB Atlas');
        
        const userSchema = new mongoose.Schema({
            name: String,
            address: {
                        type: mongoose.Schema.Types.ObjectId,
                            ref: 'Address'
                        }
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
        
        const newAddress = new Address({
            number: '123',
            street: 'Golden street',
            city: 'ABC',
            zipcode: '200000',
            country: 'DEF'
        });
        await newAddress.save();

        const newUser = new User({
            name: 'Mathew',
            address: newAddress._id
        });
        newUser.save();
        
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