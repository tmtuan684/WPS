// Capstone -- Superhero Joke CLI (starter)
//
// Before running this, install the three dependencies from this folder:
//   npm install
// (this reads package.json and installs give-me-a-joke, superheroes, chalk)
//
// NOTE: chalk v4 (pinned in package.json) uses require() -- chalk v5+ is an
// ES Module and will NOT work with require(). If you install chalk separately
// rather than via `npm install` from this package.json, make sure you get v4.
//
// Run:
//   node superhero-joke-starter.js
//   node superhero-joke-starter.js --save

const chalk = require('chalk');
const superheroes = require('superheroes');
const jokeGenerator = require('give-me-a-joke');
const fs = require('fs').promises;

// give-me-a-joke's API is callback-based. Wrap it in a Promise ONCE here, so the
// rest of the app can just use await, same pattern as fs.promises.
function getRandomJoke() {
  return new Promise((resolve) => {
    jokeGenerator.getRandomDadJoke((joke) => resolve(joke));
  });
}

async function main() {
  // TODO 1: check whether '--save' is present in process.argv
  //   (process.argv.includes('--save'))

  // TODO 2: pick a random hero name -- superheroes.random()

  // TODO 3: await a random joke -- await getRandomJoke()

  // TODO 4: build and log an output string combining the hero (in bold green,
  //   chalk.bold.green(...)) and the joke (in yellow, chalk.yellow(...))

  // TODO 5: if --save was passed, build a log line like:
  //   `[${new Date().toISOString()}] ${hero}: ${joke}\n`
  //   and append it to 'joke-log.txt' with fs.appendFile (await it!)
  //   then log a small confirmation message (chalk.dim(...) reads nicely here)
}

main();

// ------------------------------------------------------------------
// EXTENSION CHECKLIST (try these once the TODOs above are working):
//
// 1) Add a `--count N` flag that prints N jokes in a row instead of just one.
//    Hint: process.argv.indexOf('--count') to find the flag, then read the
//    NEXT array element as the number, with parseInt(...) and a fallback of 1.
//
// 2) Wrap main()'s body in try/catch so a failed joke fetch doesn't crash the
//    whole process with an unhandled rejection.
//
// 3) Add a `--history` flag that, instead of fetching a new joke, reads and
//    prints every line already saved in joke-log.txt (fs.readFile). Handle the
//    case where the file doesn't exist yet with a friendly message.
//
// 4) Split the joke-fetching and file-logging logic into their own
//    joke-service.js module, and require() it from this file.
// ------------------------------------------------------------------
