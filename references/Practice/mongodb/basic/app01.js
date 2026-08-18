const mongoose = require('mongoose');

const connstr = '';

mongoose.connect(connstr)
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch((error) => console.log(error.message));