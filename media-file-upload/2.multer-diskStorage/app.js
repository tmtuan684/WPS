// Example 2: Configure storage and filename
const express = require('express');
const multer = require('multer');

const host = '0.0.0.0';
const port = 3000;
const app = express();

// Configure destination folder and filename via diskStorage engine
// 
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({storage});

// Routes
app.get('/upload', (req, res) => {
    res.send(`<form action="/upload" method="POST" enctype="multipart/form-data">
            <input type="file" name="file"/>
            <button type="submit">Upload</button>
        </form>`)
});

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.send('File has been uploaded successfully')
})

app.listen(port, host, () => console.log(`Server is running on http://${host}:${port}`));