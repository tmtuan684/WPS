const mongoose = require('mongoose');
const connstr = 'mongodb+srv://tuantran24:mypassword@cluster0.lberqlg.mongodb.net/bookDB?appName=cluster0'

async function main() {
    mongoose.connect(connstr)
            .then(() => console.log('Connected to MongoDB Atlas'))
            .catch((error) => console.log(error.message))

    const bookSchema = new mongoose.Schema({
        name: String,
        authors: []
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

    const books = [
        {
            name: "Computer Science Fundamentals",
            authors: [authors[0], authors[1]]   
        },
        {
            name: "Advanced AI Concepts",
            authors: [authors[0], authors[2]]   
        },
        {
            name: "Software Engineering Practices",
            authors: [authors[1]]      
        },
        {
            name: "Machine Learning For Beginners",
            authors: [authors[2], authors[0]] 
        }
    ];

    const authorResult = await Author.insertMany(authors);
    console.log(`Document saved ${authorResult}`);
    const bookResult = await Book.insertMany(books);
    console.log(`Document saved ${bookResult}`);
}
main();