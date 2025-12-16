const express = require('express');
const multer = require('multer');
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Connect MongoDB Atlas

const connstr = process.env.CONNECTION_STRING;
mongoose.connect(connstr)
        .then(() => { console.log('Successfully connected to MongoDB Atlas')})
        .catch((error) => console.log(error.message));

const imageSchema = new mongoose.Schema({
      name: String,
      image: String,
      contentType: String,
});

const Image = mongoose.model('Image', imageSchema);

//Configure storage for files uploaded with multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname);
    }

});

// Initialize multer
const upload = multer({storage: storage});

// Routes
app.get('/upload', (req, res) => {
  res.render('upload');
});

app.post('/upload', upload.single('myfile'), async (req, res) => {
    const img = new Image({
        name: req.body.name,
        image: `/uploads/${req.file.filename}`,
        contentType: req.file.mimetype,
    });
    await img.save();
    res.redirect('/gallery');
})
app.get('/gallery', async (req, res) => {
    let imgs = await Image.find();
    res.render('gallery', { imgs })
})

app.listen(3000, () => console.log('Server running on port 3000'));  