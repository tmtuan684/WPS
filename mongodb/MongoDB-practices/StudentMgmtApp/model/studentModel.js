const { mongoose } = require('./dbconnect');

const studentSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String,
        age: Number,
        major: String
    });

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student };