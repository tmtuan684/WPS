const mongoose = require('mongoose');

// Replace <yourusername> and <password> with your username and actual password for the mongodb atlas cluster
mongoose.connect('mongodb+srv://tuantran24:Blessed@cluster0.lberqlg.mongodb.net/?appName=cluster0')
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.log(error.message));

mongoose.connect("")
        .then()
        .catch()