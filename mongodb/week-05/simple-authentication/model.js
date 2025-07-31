const mongoose = require('mongoose');
const { getConnString } = require('../../dbsupport');

const db = "UserAccountDB";
mongoose.connect(getConnString(db))
    .then(() => console.log(`Connected to MongoDB Atlas, ${db} database`))
    .catch(err => console.error(`Error connecting to MongoDB Atlas,${db} database`, err.message));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
