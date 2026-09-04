const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

// -----------------------------------------------------------------------------
// PART 1 — Ordinary Multer upload, saved to this server's own disk.
// This is here so the demo can show, side by side, the difference between
// "file lives on my server" and "file lives on OneDrive, served like a CDN".
// -----------------------------------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG files are allowed.'), false);
    }
  },
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// In-memory list of files uploaded to THIS server (demo only — resets on restart)
const localFiles = [];

// -----------------------------------------------------------------------------
// PART 2 — "OneDrive as CDN" (Option A: manual upload + auto-converted link).
//
// The person uploads a file to OneDrive themselves (outside this app), grabs
// the "Embed" link OneDrive generates, and pastes it in below. This app does
// NOT talk to OneDrive's API — it just does the one bit of work that's easy
// to automate: turning the "embed" link into a direct "download" link that
// can be used as an <img src="..."> or served like a CDN URL.
// -----------------------------------------------------------------------------

// In-memory list of registered OneDrive "CDN" links (demo only — resets on restart)
const cdnLinks = [];

/**
 * Converts a OneDrive "Embed" link into a direct "download" link.
 *   https://onedrive.live.com/embed?cid=...&resid=...&authkey=...
 *   -> https://onedrive.live.com/download?cid=...&resid=...&authkey=...
 * If the link doesn't match the expected shape, it's returned unchanged so
 * the person can see exactly what they pasted and try again.
 */
function toDirectDownloadLink(rawUrl) {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  if (trimmed.includes('/embed?')) {
    return trimmed.replace('/embed?', '/download?');
  }
  return trimmed; // already a direct link (or an unrecognized format)
}

app.get('/', (req, res) => {
  res.render('index', {
    localFiles,
    cdnLinks,
    uploadError: null,
    linkError: null,
  });
});

app.post('/upload', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.render('index', { localFiles, cdnLinks, uploadError: err.message, linkError: null });
    }
    if (!req.file) {
      return res.render('index', { localFiles, cdnLinks, uploadError: 'No file selected.', linkError: null });
    }
    localFiles.push({ name: req.file.filename, url: `/uploads/${req.file.filename}` });
    res.redirect('/');
  });
});

app.post('/cdn-link', (req, res) => {
  const { label, embedUrl } = req.body;

  if (!embedUrl) {
    return res.render('index', { localFiles, cdnLinks, uploadError: null, linkError: 'Paste a OneDrive link first.' });
  }

  const directUrl = toDirectDownloadLink(embedUrl);
  cdnLinks.push({
    label: label && label.trim() ? label.trim() : 'Untitled',
    original: embedUrl.trim(),
    direct: directUrl,
  });
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`OneDrive-as-CDN demo running on http://localhost:${PORT}`);
});
