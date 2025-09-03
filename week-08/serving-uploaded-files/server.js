const server = require('express');
const multer = require('multer');
const { File } = require('./model');

const port = 3000;
const app = server(); 

// Add view template engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Configure multer's storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Middleware
// Serve static files from the uploads directory
app.use('/uploads', server.static('uploads'));

//Initialize multer object
const upload = multer({ storage: storage });

// Routes
// Route to upload a file
app.get('/', (req, res) => {
    res.render('upload');
});

// Route to process file upload
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = new File({
            filename: req.file.filename,
            path: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size
        });
        await file.save();
        res.send('File uploaded successfully');
    } catch (error) {
        res.send('Error uploading file');
    }
});

// List uploaded files in json format
app.get('/list', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (err) {
    res.status(500).send('Error retrieving files');
  }
});

// Get file names
app.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.send(`
      <h1>Uploaded Files</h1>
      <ul>
        ${files.map(file => `
          <li>
            <a href="/uploads/${file.filename}" target="_blank">${file.filename}</a>
            <a href="/download/${file._id}">Download</a>
          </li>
        `).join('')}
      </ul>
    `);
  } catch (err) {
    res.status(500).send('Error retrieving files');
  }
});

// Download an uploaded file
app.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).send('File not found');
    }
    res.download(file.path, file.filename, (err) => {
      if (err) {
        res.status(500).send('Error downloading file');
      }
    });
  } catch (err) {
    res.status(500).send('Error retrieving file');
  }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

