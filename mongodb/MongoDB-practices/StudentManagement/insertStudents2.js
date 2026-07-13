const mongoose = require('mongoose');

 const db = 'studentDB';
 const connstr = `mongodb+srv://tuantran24:mypassword@cluster0.lberqlg.mongodb.net/${db}?appName=cluster0`;

 //Step 1. Connect to DB
 mongoose.connect(connstr)
        .then(() => console.log(`Connected to MongoDB Atlas, database ${db}`))
        .catch((error) => console.error(error.message));

// Step 2. Create Student Schema and Model
const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    major: String
});

const Student = mongoose.model('Student', studentSchema);

// Step Add to MongoDB data from data/students.json
const fs = require('fs');
let students = fs.readFileSync('./data/students.json', 'UTF-8');
students = JSON.parse(students);

Student.insertMany(students)
            .then((results) => console.log(results))
            .catch((error) => console.log(error));