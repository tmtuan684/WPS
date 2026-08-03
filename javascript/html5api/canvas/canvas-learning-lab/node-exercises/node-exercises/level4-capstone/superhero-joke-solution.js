// Capstone -- Superhero Joke CLI (solution, including all 4 extension items)
//
// Install first: npm install
//
// Run:
//   node superhero-joke-solution.js
//   node superhero-joke-solution.js --save
//   node superhero-joke-solution.js --count 3
//   node superhero-joke-solution.js --history

const chalk = require('chalk');
const superheroes = require('superheroes');
const jokeGenerator = require('give-me-a-joke');
const fs = require('fs').promises;

function getRandomJoke() {
  return new Promise((resolve) => {
    jokeGenerator.getRandomDadJoke((joke) => resolve(joke));
  });
}

async function main() {
  const shouldSave = process.argv.includes('--save');
  const showHistory = process.argv.includes('--history');

  try {
    if (showHistory) {
      try {
        const log = await fs.readFile('joke-log.txt', 'utf8');
        console.log(log);
      } catch {
        console.log(chalk.dim('No history yet -- run without --history first.'));
      }
      return;
    }

    const countFlagIndex = process.argv.indexOf('--count');
    const count = countFlagIndex !== -1
      ? parseInt(process.argv[countFlagIndex + 1], 10) || 1
      : 1;

    for (let i = 0; i < count; i++) {
      const hero = superheroes.random();
      const joke = await getRandomJoke();

      const output = `${chalk.bold.green(hero)} says:\n${chalk.yellow(joke)}`;
      console.log(output);

      if (shouldSave) {
        const logLine = `[${new Date().toISOString()}] ${hero}: ${joke}\n`;
        await fs.appendFile('joke-log.txt', logLine);
        console.log(chalk.dim('Saved to joke-log.txt'));
      }
      console.log('');
    }
  } catch (err) {
    console.error(chalk.red('Something went wrong:'), err.message);
  }
}

main();
