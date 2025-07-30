const mongoose = require("mongoose");
const { User, Post, Topic, Category } = require("./models");

async function insertSampleData() {
  await mongoose.connection.dropDatabase();

  // Insert categories
  const categoriesData = [
    { name: "General" },
    { name: "Announcements" },
    { name: "Help" },
    { name: "Off-topic" }
  ];
  const categories = await Category.insertMany(categoriesData);

  // Insert topics
  const topicsData = [
    { name: "Welcome", description: "Introduce yourself and meet others." },
    { name: "Site Updates", description: "Latest news and updates." }
  ];
  const topics = await Topic.insertMany(topicsData);

  // Insert users
  const usersData = [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" }
  ];
  const users = await User.insertMany(usersData);

  // Insert posts (with references)
  const postsData = [
    {
      title: "Hello World!",
      content: "This is my first post.",
      author: users[0]._id,
      topic: topics[0]._id,
      categories: [categories[0]._id]
    },
    {
      title: "Site Launch",
      content: "We are live!",
      author: users[1]._id,
      topic: topics[1]._id,
      categories: [categories[1]._id]
    }
  ];
  await Post.insertMany(postsData);

  console.log("Sample data inserted!");
  mongoose.connection.close();
}

insertSampleData().catch(console.error);
