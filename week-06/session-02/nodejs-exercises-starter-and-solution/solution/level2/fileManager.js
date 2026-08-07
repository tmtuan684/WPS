// Exercise 2.4 — File System Basics (uses the *Sync fs methods)
const fs = require('fs');
const path = require('path');

const notesDir = path.join(__dirname, 'notes');
const todoFile = path.join(notesDir, 'todo.txt');

// 1. Create the "notes" folder if it doesn't already exist.
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir);
  console.log('Created notes/ folder.');
}

// 2. Write todo.txt containing three to-do items.
const initialItems = ['Buy groceries', 'Finish Node.js exercises', 'Walk the dog'];
fs.writeFileSync(todoFile, initialItems.join('\n') + '\n');
console.log('Wrote initial to-do list.');

// 3. Read the file back and print its contents.
const contents = fs.readFileSync(todoFile, 'utf8');
console.log('--- todo.txt contents ---');
console.log(contents);

// 4. Append one more to-do item without overwriting existing content.
fs.appendFileSync(todoFile, 'Review pull requests\n');
console.log('--- todo.txt after append ---');
console.log(fs.readFileSync(todoFile, 'utf8'));
