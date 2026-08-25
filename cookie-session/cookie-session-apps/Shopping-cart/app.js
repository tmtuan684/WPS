const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

//Define server
const host = '0.0.0.0';
const port = 3000;

// Middleware
app.use(cookieParser());

// Sample data
const products = [
    {id: 'pc-1', name: 'Macbook Pro M5 32GB RAM 1TB SSD', price: 2500},
    {id: 'pc-2', name: 'Mac Mini M4 Pro 48GB RAM 2TB SSD', price: 3000},
    {id: 'pc-3', name: 'HP Zbook Firefly 32GB RAM CPU RTX A500', price: 2000},
    {id: 'phone-1', name: 'Iphone 17 Pro Max 256GB', price: 1500},
    {id: 'phone-2', name: 'Iphone Air 256GB', price: 1099},
    {id: 'tablet-1', name: 'Ipad A16 128GB', price: 349},
    {id: 'watch-1', name: 'Amazfit Active 3 premium', price: 129}
];

//Helper function
function getCart(req) {
    return JSON.parse(req.cookies.cart || '[]');
}

// Routes
app.get('/', (req, res) => {
    const cart = getCart(req);
    const rows = products.map(p => {
        const inCart = cart.includes(p.id);
        return `<tr>
            <td>${p.name}</td><td>${p.price}</td>
            <td>
                <form method="POST" action="/cart/add/${p.id}" style="display: inline;">
                    <button type="submit" ${inCart ? 'disabled': ''}> ${inCart ? 'In cart' : 'Add to cart'}</button>
                </form>
                <form method="POST" action="/cart/remove/${p.id}" style="display: inline;">
                    <button type="submit" ${!inCart ? 'disabled style="display: none;"': ''}>Remove from cart</button>
                </form>
            </td>
        </tr>`;
    }).join('');
    res.send(`<h1>Electronics Store<h1>
        <table border="1" cellpadding="4" style="border-collapse: collapse">
            <tr><th>Product</th><th>Price</th><th>Actions</tr>
            ${rows}
        </table>
        <p><a href="/cart">View cart ${cart.length} item${cart.length === 1? '' : 's'}</a></p>`);
})

app.post('/cart/add/:itemId', (req, res) => {
    const cart = getCart(req);
    cart.push(req.params.itemId);
    res.cookie('cart', JSON.stringify(cart));
    res.redirect('/');

})

app.post('/cart/remove/:itemId', (req, res) => {
    const cart = getCart(req).filter(id => id!== req.params.itemId);
    res.cookie('cart', JSON.stringify(cart));
    res.redirect('/')
})

app.get('/cart', (req, res) => {
    res.json({cart: getCart(req)});
})

// Start server
app.listen(port, host, () => console.log(`Server is running on http://${host}:${port}`));