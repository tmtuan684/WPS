const mongoose = require('mongoose');
const connstr = 'mongodb+srv://tuantran24:mypassword@cluster0.lberqlg.mongodb.net/bookDB2?appName=cluster0'

async function main() {
    mongoose.connect(connstr)
            .then(() => console.log('Connected to MongoDB Atlas'))
            .catch((error) => console.log(error.message))

    const bookSchema = new mongoose.Schema({
        name: String,
        authors: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author'
        }]
    });

    const authorSchema = new mongoose.Schema({
        name: String,
        bio: String
    });

    const Book = mongoose.model('Book', bookSchema);
    const Author = mongoose.model('Author', authorSchema);

    const authors = [
        { name: "Minh Tran", bio: "Researcher in Computer Science" },
        { name: "Anna Nguyen", bio: "Software Engineer and Lecturer" },
        { name: "David Pham", bio: "AI and Machine Learning Specialist" }]

    const authorResult = await Author.insertMany(authors);
    console.log(`Document saved ${authorResult}`);

    const books = [
        {
            name: "Computer Science Fundamentals",
            authors: [authorResult[0]._id, authorResult[1]._id]   
        },
        {
            name: "Advanced AI Concepts",
            authors: [authorResult[0]._id, authorResult[2]._id]   
        },
        {
            name: "Software Engineering Practices",
            authors: [authorResult[1]._id]      
        },
        {
            name: "Machine Learning For Beginners",
            authors: [authorResult[2]._id, authorResult[0]._id] 
        }
    ];
    const bookResult = await Book.insertMany(books);
    console.log(`Document saved ${bookResult}`);
}
main();