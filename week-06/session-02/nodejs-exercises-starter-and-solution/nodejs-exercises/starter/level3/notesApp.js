// Exercise 3.6 — Mini Project: Async Note-Taking CLI
// Usage:
//   node notesApp.js add "Buy groceries"
//   node notesApp.js list
//   node notesApp.js remove 0

const { loadNotes, addNote, removeNote } = require('./noteStore');

async function main() {
  const [, , command, ...args] = process.argv;

  // TODO: implement the "add" command — join args into a string and
  // call addNote(). Print a confirmation.

  // TODO: implement the "list" command — call loadNotes() and print
  // each note with its index, text, and createdAt.

  // TODO: implement the "remove" command — parse args[0] as a number
  // and call removeNote(). Print a confirmation.

  // TODO: handle an unknown/missing command with a helpful usage message.
}

main().catch(err => console.error('Error:', err.message));
