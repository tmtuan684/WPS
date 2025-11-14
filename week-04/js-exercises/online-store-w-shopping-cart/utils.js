/* =======================================================
            UTILITY used across the applications
=========================================================*/

/*---------------------------------------------------------
                    DATA
----------------------------------------------------------*/
/** 
 * Fetch JSON file for product items 
 * @param {string} filepath 
*/
async function fetchJSONData(filepath) {
    try {
        const response = await fetch(filepath); // Path to your JSON file
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        return data;
    } catch (error) {
        console.error('Failed to fetch JSON data:', error);
    }
}
/*---------------------------------------------------------
                    SHOPPING CART
-----------------------------------------------------------*/
/**
 * Add product to shopping cart
 * @param {*} e 
 */
function addToCart(e) {
    const productName = e.target.getAttribute("data-product-name"); 
    const productPrice = e.target.getAttribute("data-product-price"); 
    const productPhoto = e.target.getAttribute("data-product-photo"); 
    const cart = getCart();
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.qty += 1;
    } else {
        cart.push({ name: productName, price: productPrice, photo: productPhoto, qty: 1});
    }
    saveCart(cart);
}
/**
 * Update cart variable in localStorage
 * @param {*} cart 
 */
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
/**
 * Get Cart variable if exists or create one if not existed in localStorage
 * 
 */
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}
