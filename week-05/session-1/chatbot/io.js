/**
 * stdout
 * stdin
 */
process.stdout.write("Hello! Tell me a little about yourself when you’re ready.\n");
console.log("---------------------------------------------------")
const questions = [
    "What is your name?",
    "Where do you go to college?",
    "What do you major?",
    "Why do you choose this major?",
    "What type of job would you like?"
];
const answers = [];

function ask(questions, i = 0) {
    process.stdout.write(`${questions[i]} > `);
}

ask(questions);

process.stdin.on("data", (data) => {
    answers.push(data.toString().trim());
    if(answers.length < questions.length) 
        ask(questions, answers.length);
    else {
        process.exit();
    }
})
process.on("exit", () => {
    process.stdout.write("---------------------------------");
    process.stdout.write(`\nThis short introduction helps me learn a little about you — your name is ${answers[0]}, the college you attend is ${answers[1]}, your major ${answers[2]}, you chose that field because ${answers[3]}, and the type of job you're aiming for is ${answers[4]}.`)
});

