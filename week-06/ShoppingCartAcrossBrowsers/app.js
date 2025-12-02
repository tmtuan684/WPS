const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

const app = express();
cart = [];
// Configuration
const host = '0.0.0.0'; //process.env.HOST;
const port = process.env.PORT;
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index');
});

// Utility function
const getCart = (req, res) => {
    console.log(`Current Cart: ${cart}`)
    if (cart.length > 0) 
        return cart;

    const cartCookie = req.cookies.cart;
    return JSON.parse(decodeURIComponent(cartCookie));
}

app.get('/products', (req, res) => {
    fs.readFile(path.join(__dirname + '/data/products.json'), (err, data) => {
        if(err) {
            console.error(err.toString());
        }
        else if(data) {
            const products = JSON.parse(data);
            res.render('product', { products });
        }
    })
})

app.get('/addtocart/:productName', (req, res) => {
    // let cart = getCart(req, res);
    cart = getCart(req, res);
    const pf = fs.readFileSync(path.join(__dirname + '/data/products.json'), 'UTF-8');

    const plist = JSON.parse(pf);
    const product = plist.find((element) => element.name == req.params.productName);
    const productIndex = cart.findIndex(item => item.product.name == product.name);

    if(productIndex === -1 ) {
        cart.push({ product: product, quantity: 1})
    } else {
        cart[productIndex].quantity = parseInt(cart[productIndex].quantity) + 1;
    }

    const updatedCart = JSON.stringify(cart);
    res.cookie('cart', updatedCart);
    res.redirect("/cart");

});

app.get('/cart', (req, res) => {
// let cart = getCart(req, res);
   cart = getCart(req, res);
   console.log(JSON.stringify(cart));
   if(cart.length > 0) {
        res.render('cart', {cart: cart });
    } else {
        res.send("Cart is empty");
    }
});

app.post('/cart/:pname', (req, res) => {
    // let cart = getCart(req, res);
    cart = getCart(req, res);
    if(cart.length > 0) {
        const pname = req.params.pname;
        const qty = req.body.qty;
        const productIndex = cart.findIndex(item => item.product.name == pname);
        if(productIndex !== -1) {
            cart[productIndex].quantity = qty;
            if(parseInt(cart[productIndex].quantity) === 0) {
                cart.splice(productIndex, 1);
            }
        }
        const updatedCart = JSON.stringify(cart);
        res.cookie('cart', updatedCart);
    }
    res.redirect("/cart");
})

app.post('/cart/:pname/delete', (req, res) => {
    // const cart = getCart(req, res);
    cart = getCart(req, res);
    if(cart.length > 0) {
        const pname = req.params.pname;
        const productIndex = cart.findIndex(item => item.product.name == pname);
        if(productIndex !== -1) {
            cart.splice(productIndex, 1);
        }
        const updatedCart = JSON.stringify(cart);
        res.cookie('cart', updatedCart);
    }
    res.redirect("/cart");
})

app.get('/checkout', (req, res) => {
    //let cart = getCart(req, res);
    cart = getCart(req, res);
    res.render('checkout', { cart: cart});
})

app.listen(port, host, () => {
    console.log(`Server is listening at http://${host}:${port}`);
})