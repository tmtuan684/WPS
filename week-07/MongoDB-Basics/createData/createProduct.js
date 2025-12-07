
const db = 'userDB';
const connstr = `mongodb+srv://tuantran24:mypassword@cluster0.lberqlg.mongodb.net/${db}?appName=cluster0`

async function createData() {
    // Step 1. Connect to DB
    const { dbconnect } = require('../dbconnect/dbconnect');
    await dbconnect(connstr);

    // Step 2. Create Schema 
    const { Product } = require('../schema/productSchema');

    // Add new user
    const newProduct = new Product({
        name: 'Sample product',
        price: 999,
        category: 'undefined'
    });

    newProduct.save() 
        .then((product) => console.log(product))
        .catch((error) => console.log(error));
}

createData();
