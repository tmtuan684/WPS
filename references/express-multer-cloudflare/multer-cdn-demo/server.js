require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const app = express();
app.set('view engine', 'ejs');

// --- Multer: buffer in memory — nothing touches this server's disk ----------
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG files are allowed.'), false);
    }
  },
});

// --- Storage back end ------------------------------------------------------
// If R2 credentials are present, push to Cloudflare R2 (the real deployment
// path from Section 3 of the guide). Otherwise fall back to an in-memory
// store so the demo still runs end-to-end with no account required.
const R2_READY = Boolean(
  process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET &&
    process.env.R2_PUBLIC_URL
);

const memoryFiles = new Map(); // key -> { buffer, contentType }  (demo mode only)

let r2 = null;
if (R2_READY) {
  r2 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

async function storeFile(key, buffer, contentType) {
  if (R2_READY) {
    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      })
    );
    return `${process.env.R2_PUBLIC_URL}/${key}`;
  }
  memoryFiles.set(key, { buffer, contentType });
  return `/files/${key}`;
}

// --- Routes -------------------------------------------------------------
app.get('/', (req, res) =>
  res.render('index', { url: null, error: null, mode: R2_READY ? 'r2' : 'demo' })
);

app.post('/upload', (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.render('index', { url: null, error: err.message, mode: R2_READY ? 'r2' : 'demo' });
    }
    if (!req.file) {
      return res.render('index', { url: null, error: 'No file selected.', mode: R2_READY ? 'r2' : 'demo' });
    }

    // Sanitize + make unique before using as a storage key.
    const safeName = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `${Date.now()}-${safeName}`;

    try {
      const url = await storeFile(key, req.file.buffer, req.file.mimetype);
      res.render('index', { url, error: null, mode: R2_READY ? 'r2' : 'demo' });
    } catch (e) {
      console.error(e);
      res.render('index', {
        url: null,
        error: 'Upload to storage failed.',
        mode: R2_READY ? 'r2' : 'demo',
      });
    }
  });
});

// Demo-mode only: serve a buffered file straight from memory.
// In the real deployment R2's CDN serves this instead.
app.get('/files/:key', (req, res) => {
  const entry = memoryFiles.get(req.params.key);
  if (!entry) return res.status(404).send('Not found');
  res.set('Content-Type', entry.contentType); // without this, browsers download instead of render
  res.send(entry.buffer);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}  (mode: ${R2_READY ? 'Cloudflare R2' : 'in-memory demo'})`);
});
