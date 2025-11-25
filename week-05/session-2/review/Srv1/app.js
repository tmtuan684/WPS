/** 
 * This line of code does 3 things
 * 1. Declare use of express module in this server program
 * 2. Load module express into memory and create an express object representing the object 
 * 3. assign express object to express memory
*/
import express from 'express'; 
const app = express(); //   create a express server; 
import chalk from 'chalk';
// Setting address for the server hostname and port
const hostname = '127.0.0.1';
const port = 3000;

// Log to console when url is tried accessing
function log(url) {
    console.log(`GET ${chalk.bgYellow.black(url)} was accessed`);
}
// Define routes
app.get('/', (req, res) => {
    log(req.url);
    res.send("This is Index page.");
});
app.get('/about', (req, res) => {
    log(req.url);
    res.send("This is the About page.");
});
app.get('/contact', (req, res) => {
    log(req.url);
    res.send(`This is the Contact page.`);
});

// Use middleware to handle non-existent pages
app.use((req, res) => {
  log(req.url);
  res.status(404).send(`${req.url} does not exist`);  
});

// Start server
app.listen(port, hostname, () => {
   console.log(`Server is running at address ${chalk.greenBright(`http://${hostname}:${port}`)}`);
});