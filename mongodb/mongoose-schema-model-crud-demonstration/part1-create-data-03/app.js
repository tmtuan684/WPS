const {dbconnect} = require('./dbconnect');
require('dotenv').config({ path: '../.env' });

async function main() {
    // Step 1. Connect to database
    const mongoose = await dbconnect(process.env.MONGODB_URI);
    console.log("App can start now");
}

main().catch((error) => {
    console.error("Cannot connect to MongDB. The reason is: ", error.message);
    process.exit(1);
});