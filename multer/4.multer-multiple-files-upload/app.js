// Example 4: Upload multiple files
const express = require('express');
const multer = require('multer');
const fs = require('fs');

fs.mkdirSync('uploads', { recursive: true }); // diskStorage will not create it

const host = '0.0.0.0';
const port = 3000;
const app = express();

// Configure destination folder and filename via diskStorage engine
// 
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const uploadMixed = multer({ storage }).fields([
    {name: 'profilePic', maxCount: 1},
    {name: 'gallery', maxCount: 8},
    {name: 'resume', maxCount: 1}
]);

// Routes
app.get('/upload-mixed', (req, res) => {
    res.send(`<form action="/upload-mixed" method="POST" enctype="multipart/form-data">
                <input type="file" name="profilePic" /> 
                <input type="file" name="gallery" multiple />
                <input type="file" name="resume" />
                <button type="submit">Upload</button>
            </form>`);
})

app.post('/upload-mixed', (req, res) => {
    uploadMixed(req, res, (error) => { // called manually so multer errors can be caught
        if (error) {
            return res.status(400).send(error.message);
        }
        const files = req.files || {};
        console.log('profilePic:', files.profilePic);
        console.log('gallery:', files.gallery);
        console.log('resume:', files.resume);
        res.send('Files have been uploaded successfully');
    });
})

app.listen(port, host, () => console.log(`Server is running on http://${host}:${port}`));