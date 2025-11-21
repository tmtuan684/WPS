/**
 * 
 */
import readline from 'readline';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("How are you today? > ", (answer) => {
    console.log(`Your answer: ${answer}`);
    rl.close();
})