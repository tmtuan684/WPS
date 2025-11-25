const express = require('express'); 
const fs = require('fs');
const path = require('path');
const app = express(); 
const hostname = '127.0.0.1';
const port = 3000;

// Setting View engine  
app.set('view engine', 'ejs');

// Data
let products = [{
    "name": "Huawei Lite 4F",
    "photo": "https://images.pexels.com/photos/3783416/pexels-photo-3783416.jpeg?auto=compress&cs=tinysrgb&w=640&h=400",
    "category": "watch",
    "price": 205,
    "manufacturer": "Huawei",
    "salePercent": 16
  },
  {
    "name": "ASUS Max 9D",
    "photo": "https://images.pexels.com/photos/3401402/pexels-photo-3401402.jpeg?auto=compress&cs=tinysrgb&w=640&h=400",
    "category": "laptop",
    "price": 193,
    "manufacturer": "ASUS",
    "salePercent": 29
  },
  {
    "name": "Microsoft Plus 1G",
    "photo": "https://images.pexels.com/photos/3401402/pexels-photo-3401402.jpeg?auto=compress&cs=tinysrgb&w=640&h=400",
    "category": "laptop",
    "price": 925,
    "manufacturer": "Microsoft",
    "salePercent": 10
  },
  {
    "name": "Samsung Flex 9B",
    "photo": "https://images.pexels.com/photos/267391/pexels-photo-267391.jpeg?auto=compress&cs=tinysrgb&w=640&h=400",
    "category": "watch",
    "price": 378,
    "manufacturer": "Samsung",
    "salePercent": 14
  },
  {
    "name": "Apple Ultra 5G",
    "photo": "https://images.pexels.com/photos/3401402/pexels-photo-3401402.jpeg?auto=compress&cs=tinysrgb&w=640&h=400",
    "category": "laptop",
    "price": 144,
    "manufacturer": "Apple",
    "salePercent": 28
  },
  {
    "name": "Apple Lite 8D",
    "photo": "https://images.pexels.com/photos/3401402/pexels-photo-3401402.jpeg?auto=compress&cs=tinysrgb&w=640&h=400",
    "category": "laptop",
    "price": 758,
    "manufacturer": "Apple",
    "salePercent": 19
  }];
// Define routes
app.get('/', (req, res) => {
    
    res.render('index', { products });
});
app.get('/products', (req, res) => {
    const products = fs.readFileSync(path.join(__dirname,"data/products.json"), 'UTF-8');
    
    res.render('index', { products: JSON.parse(products) });
})

// Use middleware to handle non-existent pages
app.use((req, res) => {
  
  res.status(404).send(`${req.url} does not exist`);  
});

// Start server
app.listen(port, hostname, () => {
   console.log(`Server is running at address http://${hostname}:${port}`);
});