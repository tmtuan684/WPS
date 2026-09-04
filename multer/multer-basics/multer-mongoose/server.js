const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');

const app = express();

fs.mkdirSync('uploads', { recursive: true }); // diskStorage will not create it

// Configure views
app.set('view engine', 'ejs')
// Connect MongoDB Atlas
const db = 'UploadDB'
const connstr = `mongodb+srv://tuantran24:Blessed@cluster0.lberqlg.mongodb.net/${db}?appName=cluster0`
mongoose.connect(connstr)
        .then(() => { console.log('Successfully connected to MongoDB Atlas')})
        .catch((error) => console.log(error.message));

// Define File Schema and Model
const fileSchema = new mongoose.Schema({
    filename: String,
    path: String,
    mimetype: String
})

const File = mongoose.model('File', fileSchema);

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {   // Set the destination directory for uploaded files
        cb(null, 'uploads/');
    },   
    filename: (req, file, cb) => { // Create a unique filename using the current timestamp and a random number
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1000);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Define file filter to only accept JPEG and PNG files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'), false); // Reject file
    }
};

// Define Multer
const upload = multer({ storage: storage, fileFilter: fileFilter })

// Routes
// Serve the HTML upload form
app.get('/', (req, res) => {
    res.render('upload');
});

// Handle file upload
app.post('/upload', (req, res) => {
    upload.single('file')(req, res, async (uploadError) => { // manual call so fileFilter errors are catchable
        if (uploadError) {
            return res.status(400).send('Error uploading file. Error: ' + uploadError.message);
        }
        if (!req.file) {
            return res.status(400).send('No file was uploaded');
        }
        try {
            const file = new File({
                filename: req.file.filename,
                path: req.file.path,
                mimetype: req.file.mimetype
            });
            await file.save();
            res.send('File uploaded successfully');
        } catch (err) {
            res.status(500).send('Error saving file. Error: ' + err.message);
        }
    });
});

// Display uploaded file
// Create a route to display uploaded files
app.get('/files', async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (err) {
        res.status(500).send('Error retrieving files');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});




