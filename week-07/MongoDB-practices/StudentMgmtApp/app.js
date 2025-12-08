const express = require('express');
require('dotenv').config();
const { dbconnect } = require('./model/dbconnect');
const { Student } = require('./model/studentModel');

const app = express();

app.set('view engine', 'ejs');

(async () => {
    await dbconnect(process.env.CONNECTION_STRING);
    console.log("Connected to DB and models loaded.");

    // 2. Define routes AFTER connection
    app.get('/', async (req, res) => {
        const students = await Student.find({});
        console.log("Found students:", students.length);

        res.render('students', { students });
    });

    app.get('/new-student', (req, res) => {
        res.render('new-student');
    });

    const host = process.env.HOST;
    const port = process.env.PORT || 3000;
    app.listen(port, host, () => {
        console.log(`Server is listening at http://${host}:${port}`);
    });
})();
