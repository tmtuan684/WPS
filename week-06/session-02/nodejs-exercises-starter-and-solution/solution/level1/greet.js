// Exercise 1.3 — Greeting with process.argv
// Run with: node greet.js Tuan

console.log(process.argv);
// process.argv[0] -> path to the node executable
// process.argv[1] -> path to this script
// process.argv[2] onward -> the actual arguments passed by the user

const name = process.argv[2];

if (name) {
  console.log(`Hello, ${name}! Welcome to Node.js.`);
} else {
  console.log("Hello, stranger! Welcome to Node.js.");
}
