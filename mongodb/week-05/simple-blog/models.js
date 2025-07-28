/**
 * @description Mo0del file connects DB, defines schemas, and produce models
 * @requires ../dbsupport.js to get DB connection string
 */
const mongoose = require("mongoose");
const { getConnString } = require("../dbsupport");

const db = "SimpleBlogDB";
mongoose.connect(getConnString(db))
        .then(() => console.log("Successfully connected to MongoDB Atlas"))
        .catch((error) => console.error(`Failed to connect to MongoDB Atlas. It was because ${error.message}`));

/* Define schema */
// 1. User Schema
// Relationships: The user is referenced in a post instance, indicating a one-to-many relationship between the user and posts.
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

// 2. Post Schema
// Relationships: The author field references the User model, linking each post to its author.
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

/* Product models */
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema); 

/* Export models for use in other */
module.exports = { User, Post }