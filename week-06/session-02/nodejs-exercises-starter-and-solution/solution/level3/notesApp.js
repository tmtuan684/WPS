// Exercise 3.6 — Mini Project: Async Note-Taking CLI
// Usage:
//   node notesApp.js add "Buy groceries"
//   node notesApp.js list
//   node notesApp.js remove 0

const { loadNotes, addNote, removeNote } = require('./noteStore');

function printUsage() {
  console.log('Usage:');
  console.log('  node notesApp.js add "<note text>"');
  console.log('  node notesApp.js list');
  console.log('  node notesApp.js remove <index>');
}

async function main() {
  const [, , command, ...args] = process.argv;

  if (command === 'add') {
    const text = args.join(' ');
    if (!text) {
      console.error('Please provide note text, e.g. add "Buy groceries"');
      return;
    }
    const note = await addNote(text);
    console.log(`Added note: "${note.text}" (${note.createdAt})`);
  } else if (command === 'list') {
    const notes = await loadNotes();
    if (notes.length === 0) {
      console.log('No notes yet.');
      return;
    }
    notes.forEach((note, i) => {
      console.log(`${i}. ${note.text}  [${note.createdAt}]`);
    });
  } else if (command === 'remove') {
    const index = Number(args[0]);
    if (Number.isNaN(index)) {
      console.error('Please provide a valid numeric index to remove.');
      return;
    }
    const removed = await removeNote(index);
    console.log(`Removed note: "${removed.text}"`);
  } else {
    printUsage();
  }
}

main().catch(err => console.error('Error:', err.message));
