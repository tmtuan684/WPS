/**
 * Script to receive receipt lines of item and price
 * and print them out in aligned column
 * Pads the item names to ensure all items has the same length, then append the price
 * 
 * Hint: String.padEnd(<given Length>, padString): Use padString to fill the space after a string until a given length is reached
*/

/**
 * 
 * @param {string} item 
 * @param {number} price 
 * @returns {string} a formatter string representing a receipt line
 */
function receiptLine(item, price) {
    // How to: all receiptlines have the same length
    // For a receipt line, count the item length, than subtract the receipt length by the item length, after that fill the space with "."; and finally write the price
    const receiptLineMaxlength = 40; 
    const neededPadding = receiptLineMaxlength - price.toString().length;
    
    // Pad the item name with "." characters, but only if padding is required. This prevents unnecessary padding.
    return `${item.padEnd(neededPadding, '.')}${price.toFixed(2)}`;
}

let menuItems = ['Cappuccino', 'Latte', 'Condensed milk coffee', 'Ice Tea'];
let price = [10, 8, 3, 2];

for(let i=0; i<menuItems.length; i++) {
    console.log(receiptLine(menuItems[i], price[i]) + "\n");
}