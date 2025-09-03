const { get } = require('http');
const { getConnString } = require('./dbsupport');
const mongoose = require('mongoose');

const db = "FileUploadDB";
mongoose.connect(getConnString(db))
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    uploadDate: { type: Date, default: Date.now }
});

const File = mongoose.model('File', fileSchema);

module.exports = { File };
