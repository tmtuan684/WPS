const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

// Simulated login (sets a session cookie)
app.get('/login', (req, res) => {
  res.setHeader('Set-Cookie', 'session=loggedin');
  res.send('Logged in');
});

// ❌ Vulnerable: no CSRF protection
app.post('/update-email', (req, res) => {
  if (req.body.csrfToken !== 'ABC123') {
    return res.status(403).send('CSRF detected');
  }
  const newEmail = req.body.email;
  res.send(`Email updated to ${newEmail}`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
