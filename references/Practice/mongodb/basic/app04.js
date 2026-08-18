const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
        await mongoose.connect(process.env.MONGODB_URI);

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
        console.log('[1] blogSchema:', blogSchema);

        const Blog = mongoose.model('Blog', blogSchema);
        console.log('[2] Blog:', Blog);
}
main().catch((error) => {
        console.log('[ERROR]', error.message);
        process.exit(1);
})