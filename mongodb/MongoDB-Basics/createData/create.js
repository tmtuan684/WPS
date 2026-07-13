
const db = 'userDB';
const connstr = `mongodb+srv://tuantran24:mypassword@cluster0.lberqlg.mongodb.net/${db}?appName=cluster0`

async function createData() {
    // Step 1. Connect to DB
    const { dbconnect } = require('../dbconnect/dbconnect');
    await dbconnect(connstr);

    // Step 2. Create Schema 
    const { User } = require('../schema/userSchema');

    // Add new user
    const newUser = new User({
        firstName: 'Peter',
        lastName: 'John',
        email: 'tuantran@email.com',
        age: 30
    });

    newUser.save() 
        .then((user) => console.log(user))
        .catch((error) => console.log(error));
}

createData();
