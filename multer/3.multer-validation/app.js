// Example 3: Validate type and size of uploaded files
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
    },
});

const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. JPEG and PNG files only'), false);
        }
    }
    
const limits = {fileSize: 1024 * 1024 * 5}; // 5MB

const upload = multer({storage, fileFilter, limits });

// Routes
app.get('/upload', (req, res) => {
    res.send(`<form action="/upload" method="POST" enctype="multipart/form-data">
            <input type="file" name="file"/>
            <button type="submit">Upload</button>
        </form>`)
});

app.post('/upload', (req, res) => {
    upload.single('file')(req, res, (error) => { // upload.single()(req,res,cb) is called manually rather than as a middleware so that we can catch errors flexibly
        if (error) {
            return res.status(400).send(error.message);
        } else {
            console.log(req.file);
            res.send('File has been uploaded successfully')
        }
    })
    
})

app.listen(port, host, () => console.log(`Server is running on http://${host}:${port}`));