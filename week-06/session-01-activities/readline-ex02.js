// Declare to use readline module, built-in from Nodejs
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Name: ', (name) => {
  rl.question('Age: ', (age) => {
    console.log(`${name} is ${age} years old.`);
    rl.close();
  });
});