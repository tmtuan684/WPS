// Declare to use readline module, built-in from Nodejs
const readline = require('readline/promises');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = ["What's your name?", "Where do you go to college?", "What year are you in?", "What is your major?"]
let answers = [];

async function main() {
    for(let i = 0; i < questions.length; i++) {
        const answer = await rl.question(questions[i])
        answers.push(answer);
    }

    console.log("Hello");
    answers.forEach(ans => { console.log(ans); })

    rl.close();
}
main();