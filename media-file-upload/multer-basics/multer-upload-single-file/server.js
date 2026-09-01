const express = require('express');
const multer = require('multer');
const app = express();

// Configure storage location & filename
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname);
    }
})

// Declare upload middleware
const upload = multer({ storage: storage});


// Step 3: Create a route to handle upload
// Create a form to upload files
app.get('/upload', (req, res) => {
  res.send(`
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="myfile" />
      <button type="submit">Upload</button>
    </form>
  `);
});

app.post('/upload', upload.single('myfile'), (req, res) => {
  res.send({
    message: 'File uploaded successfully!',
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));  