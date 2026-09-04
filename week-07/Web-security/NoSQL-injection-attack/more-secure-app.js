const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/nosqli_demo')

// Simulated database (instead of real MongoDB)
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

const newUser = new User({ username: "admin", password: "secret"});
newUser.save();


// ✅ SAFE
app.post('/login', async (req, res) => {
  const username = String(req.body.username);
  const password = String(req.body.password);

  const user = await User.findOne({
    username: { $eq: username },
    password: { $eq: password }
  });

  if (user) {
    res.send('Login successful');
  } else {
    res.status(401).send('Login failed');
  }
});


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
