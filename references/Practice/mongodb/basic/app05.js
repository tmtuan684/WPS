const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');

        const blogSchema = new mongoose.Schema(
                {
                        title: String,
                        slug: String,
                        published: Boolean,
                        author: String,
                        content: String,
                        tags: [String],
                        comments: [
                                {
                                        user: String,
                                        content: String,
                                        votes: Number,
                                },
                        ],
                }
        );
        const Blog = mongoose.model('Blog', blogSchema);
}
main().catch((error) => {
        console.log(error.message);
        process.exit(1);
})