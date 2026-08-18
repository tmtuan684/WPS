require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI_OOE);

    if (mongoose.connection.readyState == 1) {
        console.log('Connected to MongoDB Atlas');

        const userSchema = new mongoose.Schema({
            name: String,
            address: String
        });

        const User = mongoose.model('User', userSchema);

        const newUser = new User({
            name: 'Mathew',
            address: '123 Golden Street'
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
