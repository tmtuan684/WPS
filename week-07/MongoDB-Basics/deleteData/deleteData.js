
const db = 'userDB';
const connstr = `mongodb+srv://tuantran24:mypassword@cluster0.lberqlg.mongodb.net/${db}?appName=cluster0`

async function deleteData() {
    // Step 1. Connect to DB
    const { dbconnect } = require('../dbconnect/dbconnect');
    await dbconnect(connstr);

    // Step 2. Create Schema 
    const { User } = require('../schema/userSchema');

    // Step 3. Read data and update
    User.deleteOne({firstName: 'Peter', lastName: 'John'})
        .then((users) => console.log(users))
        .catch((error) => console.log(error));
}

deleteData();
