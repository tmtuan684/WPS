const mongoose = require('mongoose')

const dbconnect = async (connectString) => {
        await mongoose.connect(connectString)
                .then(() => { console.log("Connected to MongoDB")})
                .catch((error) => console.log(error.message));
}

module.exports =  { dbconnect }