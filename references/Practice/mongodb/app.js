const {dbconnect} = require('./schema-model-01/dbconnect');
require('dotenv').config();

async function main() {
    await dbconnect(process.env.MONGODB_URI);
    console.log("App can start now");
}

main().catch((error) => {
    console.error("Cannot connect to MongDB. The reason is: ", error.message);
    process.exit(1);
});