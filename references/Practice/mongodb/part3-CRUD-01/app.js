async function main() {

    const newUser = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        age: 30,
    };
    const { createUser } = require('./createUser');
    await createUser(newUser);

    const newProduct = {
            name: 'Sample Product',
            price: 100,
            category: 'Electronics',
        };
    const {createProduct } = require('./createProduct');
    await createProduct(newProduct);
    
}

main().catch((error) => {
    console.error("Cannot connect to MongDB. The reason is: ", error.message);
    process.exit(1);
});