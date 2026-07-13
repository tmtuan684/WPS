var express = require('express');
var session = require('express-session');  
var app = express(); 
var port = 3000;

// Define a session
var mySession = session({
  secret: 'shared-secret',  // This should be a strong secret, kept private; it is used to sign ( encrypt) the session ID cookie
  resave: false,
  saveUninitialized: false, // Don't save uninitialized sessions
  cookie: { secure: false, maxAge: 60 * 60 * 1000 } // Set to true if using HTTPS, maxAge is in milliseconds
});

// Use the session middleware
app.use(mySession);

// Define a route to set a session variable
app.get('/set-session', function(req, res) {
  req.session.user = { name: 'John Doe', age: 30 }; // Set a session variable
  res.send('Session variable set!');
});

// Define a route to get the session variable
app.get('/get-session', function(req, res) {
  if (req.session.user) {
    res.send(`Session user: ${req.session.user.name}, Age: ${req.session.user.age}`);
  } else {
    res.send('No session variable set.');
  }
}); 

// Define a route to delete the session
app.get('/delete-session', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      return res.send('Error deleting session.');
    }
    res.send('Session deleted.');
  });
});     

// Start the server
app.listen(port, function() {
  console.log(`Server is running on http://localhost:${port}`);
});