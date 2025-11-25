/**
 * 
 */
import readline from 'readline';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    "What is your name?",
    "Where do you go to college?",
    "What do you major?",
    "Why do you choose this major?",
    "What type of job would you like?"
];
const answers = [];

function conversation(questions, answers, closing) {
    
    const ask = (answer) => {
        answers.push(answer.toString().trim());
        if(answers.length < questions.length) 
            rl.question(questions[answers.length]+" >", ask)
        else {
            return closing();
        }
    }
    rl.question(questions[0] + "> ", ask);
}

conversation(questions, answers, () =>{
    console.log("Thank you for your answers!");
    console.log(answers);
    console.log("It was nice talking with you!");
    process.exit();
})