// Step 1: pre-define questions
const questions = [
  "What's your name?",
  "Where do you go to college?",
  "What year are you in?",
  "What is your major?"
];
let answers = [];
let currentIndex = 0;

// Step 2: ask the first question to kick things off
process.stdout.write(`${questions[currentIndex]} `);

process.stdin.on("data", (data) => {
  const input = data.toString().trim();

  // Step 3: store the answer
  answers.push(input);
  currentIndex++;

  // Step 4: check if there are more questions
  if (currentIndex < questions.length) {
    // Step 2 (loop back): ask the next question
    process.stdout.write(`${questions[currentIndex]} `);
  } else {
    // No questions left — display results and end
    console.log("\nHere are your answers:");
    questions.forEach((q, i) => {
      console.log(`${q} ${answers[i]}`);
    });
    process.exit();
  }
});