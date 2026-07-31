// Exercise 2.3 — A Tiny Notes Module (Solution)

const fs = require('fs');
const FILE = 'notes.json';

function readNotes() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, 'utf8'));
}

function addNote(text) {
  const notes = readNotes();
  notes.push({ text, createdAt: new Date().toISOString() });
  fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));
}

module.exports = { addNote, readNotes };
