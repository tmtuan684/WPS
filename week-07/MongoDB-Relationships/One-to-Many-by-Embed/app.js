const mongoose = require('mongoose');
const connstr = 'mongodb+srv://tuantran24:mypassword@cluster0.lberqlg.mongodb.net/contactDB3?appName=cluster0'

mongoose.connect(connstr)
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch((error) => console.log(error.message))

const userSchema = new mongoose.Schema({
    name: String,
    address: []
});

const User = mongoose.model('User', userSchema);

const newUser = new User({
    name: 'Mathew',
    address: ['123 ABC Street', '456 DEF Street', '789 GHI Street']
})
newUser.save()
        .then((user) => console.log(`Document saved ${user}`))
        .catch((error) => console.log(error.message));