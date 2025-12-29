const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

// Show form
app.get('/', (req, res) => {
  res.send(`
    <h2>Leave a comment</h2>
    <form method="POST">
      <input type="text" name="comment" />
      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle form (❌ vulnerable)
app.post('/', (req, res) => {
  const comment = req.body.comment;

  res.send(`
    <h2>Your comment</h2>
    <p>${comment}</p>
    <a href="/">Back</a>
  `);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
