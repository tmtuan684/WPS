/**
 * script to receive an amount of money
 * then format and display it in current format
 * input: 1234.5
 * output: $1,234.50
 */

// prompt for an input and convert it to number
let amount = parseFloat(prompt("Amount of money (e.g., 1234.5): "));

// format number to have 2 digits after the decimal point
amount = amount.toFixed(2); // 1234.5 -> 1234.50
// Format procedure
// 1. split amount into 2 parts: whole and cents
let [whole, cents] = amount.split('.'); // 1234.50 -> ['1234', '50']
// 2. format the whole by adding a comma after every 3 digits from right to left
let temp = '';
for(let i = whole.length-1, c=0; i >= 0; i--, c++) {
    if (c === 3) {
        c = 0;
        temp = "," + temp;
    }
    temp = whole[i] + temp;
    
}
whole = temp;
amount = `$${whole}.${cents}`;

console.log(`Amount: ${amount}`);

