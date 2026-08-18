const mongoose = require('mongoose');

  // Step 2. Schemas are designed
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
});

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
});

const User = mongoose.model('User', userSchema);

const Product = mongoose.model('Product', productSchema);

module.exports = { User, Product }