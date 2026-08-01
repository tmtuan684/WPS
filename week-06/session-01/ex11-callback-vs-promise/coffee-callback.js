// Make a cup of coffee
// and call the customer back to get the coffee when it is ready
function makeCoffee(callback) {
    setTimeout(()=>{
        callback('Your coffee is ready');
    }, 1000);
}

console.log('Customer places an order.');
makeCoffee((message) => {
    console.log(message);
})

makeCoffee()

console.log('Waiting for coffee...');