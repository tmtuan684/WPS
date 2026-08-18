const mongoose = require('mongoose');

const db = "DB1";
const connstr = `mongodb+srv://tuantran24:Blessed@cluster0.lberqlg.mongodb.net/${db}?appName=cluster0`;

// Step 1. Connect to DB
mongoose.connect(connstr)
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch((err) => console.log(err.message));