// Reference for extension item 4 -- splitting logic into its own module.
// This is a fully separate example file, not required for the main solution
// above, to show what "pulling this out into a module" would look like.

const superheroes = require('superheroes');
const jokeGenerator = require('give-me-a-joke');
const fs = require('fs').promises;

function getRandomJoke() {
  return new Promise((resolve) => {
    jokeGenerator.getRandomDadJoke((joke) => resolve(joke));
  });
}

async function getHeroJoke() {
  const hero = superheroes.random();
  const joke = await getRandomJoke();
  return { hero, joke };
}

async function saveToLog(hero, joke) {
  const logLine = `[${new Date().toISOString()}] ${hero}: ${joke}\n`;
  await fs.appendFile('joke-log.txt', logLine);
}

async function readHistory() {
  try {
    return await fs.readFile('joke-log.txt', 'utf8');
  } catch {
    return null;
  }
}

module.exports = { getHeroJoke, saveToLog, readHistory };
