const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();

// Configure views
app.set('view engine', 'ejs')

// Configure form
app.use(express.urlencoded({extended: true}));

// Connect MongoDB Atlas
const db = 'imageDB'
const connstr = `mongodb+srv://tuantran24:Blessed@cluster0.lberqlg.mongodb.net/${db}?appName=cluster0`
mongoose.connect(connstr)
        .then(() => { console.log('Successfully connected to MongoDB Atlas')})
        .catch((error) => console.log(error.message));

const imageSchema = new mongoose.Schema({
    name: String,
    image: Buffer,
    contentType: String,
});

const Image = mongoose.model('Image', imageSchema);

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

app.get('/', (req, res) => {
    res.render('index');
});

// Handle POST requests to the '/upload' endpoint
app.post('/upload', upload.single('image'), async (req, res) => {
    const img = new Image({
        name: req.body.name,
        image: req.file.buffer,
        contentType: req.file.mimetype,
    });
    await img.save();
    res.redirect(`/image/${img._id}`);

});

app.get('/image/:id', async (req, res) => {
    const image = await Image.findById(req.params.id);
    if (!image) {
        return res.status(404).send('Image not found');
    }
    // Convert image binary data to a base64 string
    const base64Image = image.image.toString('base64');
    res.render('image', { image, base64Image });
});

app.get('/image/data/:id', async (req, res) => {
    const image = await Image.findById(req.params.id);
    if (!image) {
        return res.status(404).send('Image not found');
    }

    res.contentType(image.contentType);
    res.send(image.image);

});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});     