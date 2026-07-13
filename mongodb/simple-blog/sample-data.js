/**
 * @description This file add to the database sample data for a simple blog application.
 * @description This file was written with assistance from GitHub Copilot
 * 
 */
const mongoose = require("mongoose");
const { User, Post } = require("./models"); 

// Sample data for users
const users = [
    { name: "Alice Smith", email: "alice@example.com" },
    { name: "Bob Johnson", email: "bob@example.com" },
    { name: "Charlie Brown", email: "charlie@example.com" }
];

// Sample data for posts
const posts = [
    { title: "First Post", content: "This is the content of the first post.", author: 1 },
    { title: "Second Post", content: "This is the content of the second post.", author: 2 },
    { title: "Third Post", content: "This is the content of the third post.", author: 3 }
];
// Function to add sample users to the database
async function addUsers() {
    for (let userData of users) {
        const user = new User(userData);
        await user.save()
            .then(savedUser => console.log(`User ${savedUser.name} added to DB`))
            .catch(error => console.error(`Error adding user: ${error.message}`));
    }
}

// Function to add sample posts to the database
async function addPosts() {
    for (let postData of posts) {
        // Find randomly a author in the database
        const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);
        if (randomUser.length > 0) {
            postData.author = randomUser[0]._id; // Set the author to a random user
        } else {
            console.error("No users found in the database to assign as authors.");
            return; // Skip this post if no users are found
        }
        // Create and save the post
        const post = new Post(postData);
        await post.save()
            .then(savedPost => console.log(`Post ${savedPost.title} added to DB`))
            .catch(error => console.error(`Error adding post: ${error.message}`));
    }
}

// Main function to run the data insertion
async function main() {
    try {
        await addUsers();
        await addPosts();
        console.log("Sample data added successfully.");
    } catch (error) {
        console.error(`Error adding sample data: ${error.message}`);
    } finally {
        // Close the connection after adding  data
        mongoose.connection.close();
    }
}       
// Run the main function
main()
    .catch(error => console.error(`Error in main function: ${error.message}`));