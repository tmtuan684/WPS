const express = require('express');
const multer = require('multer');

const app = express();
// Configure multer
const storage = multer.memoryStorage();

// Initialize multer
const upload = multer({ storage: storage});

app.get('/upload', (req, res) => {
  res.send(`
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  `);
});

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);

  // req.file.buffer contains the actual file data
  console.log("File buffer size:", req.file.buffer.length);

  res.send("File received in memory!");
});

app.listen(3000, () => console.log('Server running on port 3000'));  