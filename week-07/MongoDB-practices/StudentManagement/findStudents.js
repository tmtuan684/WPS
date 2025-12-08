/**
 * Get argument of the a specific parameter
 * @param {*} flag 
 * @returns positive index if argument exists, 0 if the argument does not exist 
 */
function indexOf(flag) {
    let indexAfterFlag = process.argv.indexOf(flag) + 1; 
    return indexAfterFlag;
}

const { dbconnect } = require('./dbconnect');

const db = 'studentDB';
const connstr = `mongodb+srv://tuantran24:mypassword@cluster0.lberqlg.mongodb.net/${db}?appName=cluster0`;

async function main() {
    //Step 1. Connect to DB
    await dbconnect(connstr);

    // Step 2. Create Student Schema and Model
    const { Student } = require('./studentModel');

    // Step 3. Get search name and Search
    const searchFirstName = process.argv[indexOf('--firstname')];

    // Search
    Student.find({firstName: searchFirstName })
            .then((students) => console.log(students))
            .catch((error) => console.log(error.message));
}
main();
