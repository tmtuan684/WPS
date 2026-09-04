const mongoose = require('mongoose');
require('dotenv').config({path: '../.env'});

mongoose.connect(process.env.MONGODB_URI)
        .then(() => { 
                console.log('Connected to MongoDB Atlas')
                process.exit(1);
        })
        .catch((error) =>  {
                        console.log(error.message);
                        process.exit(1);
                });