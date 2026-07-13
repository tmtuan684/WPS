const { mongoose } = require('../dbconnect/dbconnect');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: Number,
    category: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
