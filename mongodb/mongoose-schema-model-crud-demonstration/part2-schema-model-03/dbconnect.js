const mongoose = require('mongoose');

const dbconnect = async (connstr) => {
    await mongoose.connect(connstr);
    console.log('Connected to MongoDB Atlas');
    return mongoose;
}

module.exports = {mongoose, dbconnect}