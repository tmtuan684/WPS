const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');
}
main().catch((error) => {
        console.log(error.message);
        process.exit(1);
})