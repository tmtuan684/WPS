import express from 'express'; 
const app = express(); 
const hostname = '127.0.0.1';
const port = 3000;

// Middleware
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
    
    res.send("This server offers static pages");
});

// Use middleware to handle non-existent pages
app.use((req, res) => {
  
  res.status(404).send(`${req.url} does not exist`);  
});

// Start server
app.listen(port, hostname, () => {
   console.log(`Server is running at address http://${hostname}:${port}`);
});