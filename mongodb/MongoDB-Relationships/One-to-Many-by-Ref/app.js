const mongoose = require('mongoose');
const connstr = 'mongodb+srv://tuantran24:mypassword@cluster0.lberqlg.mongodb.net/contactDB4?appName=cluster0'

async function main() {
    mongoose.connect(connstr)
            .then(() => console.log('Connected to MongoDB Atlas'))
            .catch((error) => console.log(error.message))
            
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
    })

    const User = mongoose.model('User', userSchema);
    const Address = mongoose.model('Address', addressSchema);

    const address1 = new Address({
        number: '123',
        street: 'Golden street',
        city: 'ABC',
        zipcode: '200000',
        country: 'DEF'
    })

    const address2 = new Address({
        number: '456',
        street: 'Silver street',
        city: 'ABC',
        zipcode: '12345678',
        country: 'DEF'
    })

    await address1.save();
    await address2.save();

    const newUser = new User({
        name: 'Mathew',
        address: [address1._id, address2._id] 
    })

    newUser.save()
            .then((user) => console.log(`Document saved ${user}`))
            .catch((error) => console.log(error.message));
}

main();