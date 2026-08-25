/**
 * @description app lists all posts, add a new post, edit or delete an existing post
 * @requires express, ejs, ./models
 */
const express = require("express");
const { User, Post } = require("./models");
const app = express();

/* Define server */
const host='0.0.0.0';
const port = 8000;

// Add view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Add middlewares
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

//
/* Routes */
// READ - List all post
app.get(["/", "/posts"], (req, res) => {
    Post.find({})
        .populate("author") // Populate author field with user details
        .then(posts => {
            title = "Posts";
            res.render("index", { title: "Posts", posts });
        })
        .catch(error => {
            res.send(error.message);
            console.error(`Error getting posts: ${error.message}`)
        });
});

// CREATE - Form to add a new post
app.get("/posts/new", (req, res) => {
    User.find({})
        .then(users => {
            res.render("create-post", { title: "Add New Post", users });
        })
        .catch(error => {
            res.send(error.message);
            console.error(`Error getting users for new post: ${error.message}`);
        });
});

// CREATE - Add new post
app.post("/posts/new", (req, res) => {
    // Get post data from the request body
    const { title, content, author } = req.body;
    
    // Validate data
    if (!author) {
        res.send("Author is required to create a post.");
        return;
    }
    if (!title || !content) {
        res.send("Title and content are required to create a post.");
        return;
    }
    const post = new Post({ title, content, author });
    // Save the post to the database
    post.save()
        .then(savedPost => {
            console.log(`Post ${savedPost.title} added to DB`);
            res.redirect("/posts");
        })
        .catch(error => {
            res.send(error.message);
            console.error(`Error adding post: ${error.message}`);
        });
});

// UPDATE - Form to edit a post
app.get("/posts/:id/edit", (req, res) => {
    const postId = req.params.id;
    Post.findById(postId)
        .populate("author")
        .then(post => {
            if (!post) {
                res.status(404).send("Post not found");
                return;
            }
            User.find({})
                .then(users => {
                    res.render("edit-post", { title: "Edit Post", post, users });
                })
                .catch(error => {
                    res.send(error.message);
                    console.error(`Error getting users for edit post: ${error.message}`);
                });
        })
        .catch(error => {
            res.send(error.message);
            console.error(`Error getting post for update: ${error.message}`);
        });
});

// UPDATE - update a post
app.post("/posts/:id/edit", (req, res) => {
    const postId = req.params.id;
    const { title, content, author } = req.body;

    // Validate data
    if (!author) {
        res.send("Author is required to update a post.");
        return;
    }
    if (!title || !content) {
        res.send("Title and content are required to update a post.");
        return;
    }

    Post.findByIdAndUpdate(postId, { title, content, author }, { new: true }) // new: true returns the new document rather than the old
        .then(updatedPost => {
            if (!updatedPost) {
                res.status(404).send("Post not found");
                return;
            }
            console.log(`Post ${updatedPost.title} updated in DB`);
            res.redirect("/posts");
        })
        .catch(error => {
            res.send(error.message);
            console.error(`Error updating post: ${error.message}`);
        });
});

// DELETE - Form to delete a post
app.get("/posts/:id/delete", (req, res) => {
    const postId = req.params.id;
    Post.findById(postId)
        .populate("author")
        .then(post => {
            if (!post) {
                res.status(404).send("Post not found");
                return;
            }
            res.render("delete-post", { title: "Delete Post", post });
        })
        .catch(error => {
            res.send(error.message);
            console.error(`Error getting post for deletion: ${error.message}`);
        });
});

// DELETE - Delete a post
app.post("/posts/:id/delete", (req, res) => {
    const postId = req.params.id;
    Post.findByIdAndDelete(postId)
        .then(deletedPost => {
            if (!deletedPost) {
                res.status(404).send("Post not found");
                return;
            }
            console.log(`Post ${deletedPost.title} deleted from DB`);
            res.redirect("/posts");
        })
        .catch(error => {
            res.send(error.message);
            console.error(`Error deleting post: ${error.message}`);
        });
});

// CREATE - Form to add a new author
app.get("/authors/new", (req, res) => {
    res.render("create-author", { title: "Add New Author" });
});

// CREATE - Add new author
app.post("/authors/new", (req, res) => {
    const { name, email } = req.body;

    // Validate data
    if (!name || !email) {
        res.send("Name and email are required to create an author.");
        return;
    }

    const user = new User({ name, email });
    user.save()
        .then(savedUser => {
            console.log(`Author ${savedUser.name} added to DB`);
            res.redirect("/posts/new");
        })
        .catch(error => {
            res.send(error.message);
            console.error(`Error adding author: ${error.message}`);
        });
});

/* Start server */
app.listen(port, host, () => console.log(`Server is listening on port ${port}`));