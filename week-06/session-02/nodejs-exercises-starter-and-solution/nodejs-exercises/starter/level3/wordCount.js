// Exercise 3.5 — Build a CLI Word Counter with npm
// Setup first:
//   npm init -y          (already done for you in this starter)
//   npm install chalk@4  (chalk@4 works with require(); newer chalk is ESM-only)
//
// Run with: node wordCount.js <path-to-file>

const fs = require('fs').promises;
// TODO: const chalk = require('chalk');

async function main() {
  // TODO: get the file path from process.argv

  // TODO: read the file asynchronously with fs.promises.readFile

  // TODO: split into words, count the total, and find the 3 most frequent words
  //   Hint: build a { word: count } object, then sort its entries.

  // TODO: print results using chalk for colored output, e.g.:
  //   console.log(chalk.green(`Total words: ${total}`));
  //   console.log(chalk.yellow('Top 3 words:'), topWords);
}

main().catch(err => console.error('Error:', err.message));
