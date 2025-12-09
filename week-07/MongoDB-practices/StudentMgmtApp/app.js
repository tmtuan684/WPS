const express = require('express');
require('dotenv').config();
const { dbconnect } = require('./model/dbconnect');
const { Student } = require('./model/studentModel');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

(async () => {
    await dbconnect(process.env.CONNECTION_STRING);
    console.log("Connected to DB and models loaded.");

    // 2. Define routes AFTER connection

    // Endpoint GET /
    app.get(['/', '/students'], async (req, res) => {
        const students = await Student.find({});
        console.log("Found students:", students.length);

        res.render('students', { students });
    });

    app.get('/students/new', (req, res) => {
        res.render('new-student');
    });

    // Endpoint POST /new-student
    app.post('/new-student', (req, res) => {
        const newStudent = new Student(req.body);

        newStudent.save()
            .then((stud) => { 
                console.log(`New document is saved ${stud}`);
                res.redirect('/');
            })
            .catch((error) => { console.log(error.message)})
        
    })

    //Endpoint GET /student/:id/edit
    app.get('/students/:id/edit', (req, res) => {
        const studID = req.params.id;
        Student.findById(studID)
                .then((student) => {
                    res.render('edit-student', {student});
                })
                .catch((error) => { console.log(error.message)});
    })

    //Endpoint POST /student/:id/edit 
    app.post('/students/:id/edit', (req, res) => {
        const studID = req.params.id;
        const updates = req.body;

        Student.findByIdAndUpdate(studID, updates, {new: true})
            .then((student) => {
                console.log(`Updates ${student}`);
                res.redirect('/');
            })
            .catch((error) => {
                console.log(error.message);
            })
    })

    //Endpoint GET /student/:id/delete
    app.get('/students/:id/delete', (req, res) => {
        const studID = req.params.id;
        Student.findById(studID)
                .then((student) => {
                    res.render('delete-student', {student});
                })
                .catch((error) => { console.log(error.message)});
    })

    //Endpoint POST /student/:id/delete 
    app.post('/students/:id/delete', (req, res) => {
        const studID = req.params.id;

        Student.findByIdAndDelete(studID)
                .then((student) => {
                    console.log(`Delete ${student}`);
                    res.redirect('/');
                })
                .catch((error) => {console.log(error.message)});
    })

    const host = process.env.HOST;
    const port = process.env.PORT || 3000;
    app.listen(port, host, () => {
        console.log(`Server is listening at http://${host}:${port}`);
    });
})();
