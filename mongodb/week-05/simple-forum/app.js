/**
 * @description Server of this forum app
 */
const express = require("express");
const { User, Post, Topic, Category} = require("./models");
const app = express();

/** Define server */
const host = "127.0.0.1";
const port = "8888";

// Template engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Add middlewarea
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

/* Routes */
// READ - Find all posts and list them on homepage
app.get("/", async (req, res) => {
    const posts = await Post.find().populate("author").populate("topic").populate("categories");
    res.render("index", { posts });
});

// ---------  CRUD operations for Topics --------- //
// CREATE - Form for adding new topic
app.get("/topics/add", async (req, res) => {
    // Find all topics to display in the form and count number of posts in each topic
    const topics = await Topic.find({});
    const topicsWithNumPosts = [];
    for (let topic of topics) {
        const numposts = await Post.countDocuments({ topic: topic._id });
        topicsWithNumPosts.push({ ...topic.toObject(), numposts });
    }
    console.log(topicsWithNumPosts);
    res.render("add-topic", { topics: topicsWithNumPosts });
});

// CREATE - Add new topic
app.post("/topics/add", async (req, res) => {
    const { name, description } = req.body;
    const topic = new Topic({ name, description });
    await topic.save()
        .then(newTopic => {
            console.log(`New topic ${newTopic.name} has been added!`);
        })
        .catch(error => {console.error(`Cannot add new topic. The error is ${error.message}`);});
    // Stay on the same page after adding the topic
    res.redirect("/topics/add");
})
// -------- CRUD operations for Posts --------- //

/* Start server */
app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});