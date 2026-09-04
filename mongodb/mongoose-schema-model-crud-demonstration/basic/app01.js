const mongoose = require('mongoose');

const connstr = 'mongodb+srv://tuantran24:Blessed@cluster0.lberqlg.mongodb.net/WPSDB';

mongoose.connect(connstr)
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch((error) => console.log(error.message));