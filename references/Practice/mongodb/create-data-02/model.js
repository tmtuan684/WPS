const mongoose = require('mongoose');

  // Step 2. Schemas are designed
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    age: Number,
});

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
});

const User = mongoose.model('User', userSchema);
console.log(`User model has been successfully made.`);

const Product = mongoose.model('Product', productSchema);
console.log(`Product model has been successfully made.`);

module.exports = { User, Product }