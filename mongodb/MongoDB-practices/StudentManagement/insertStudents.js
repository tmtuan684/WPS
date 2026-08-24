const { dbconnect } = require('./dbconnect');

const db = 'studentDB';
const connstr = `mongodb+srv://tuantran24:Blessed@cluster0.lberqlg.mongodb.net/${db}?appName=cluster0`;

async function main() {
    //Step 1. Connect to DB
    await dbconnect(connstr);

    // Step 2. Define Schema and produce Model
    const { Student } = require('./studentModel');

    // Step 3. Add to MongoDB data from data/students.json
    const fs = require('fs');
    let students = fs.readFileSync('./data/students.json', 'UTF-8');
    students = JSON.parse(students);

    students.forEach(item => {
        let newStudent = new Student(item);
        newStudent.save()
                .then((student) => console.log(student))
                .catch((error) => console.log(error));
    })
}

main();