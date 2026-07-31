// Exercise 2.3 — A Tiny Notes Module (module file)
//
// Build a module with two exported functions:
//   addNote(text)  -> appends a note to notes.json (creating it if missing)
//   readNotes()    -> returns the full array of saved notes
//
// notes.json should hold an array of objects like:
//   [{ text: "Buy coffee", createdAt: "2026-07-30T10:00:00.000Z" }]

const fs = require('fs');
const FILE = 'notes.json';

function readNotes() {
  // TODO 1: if the file doesn't exist yet (fs.existsSync), return an empty array

  // TODO 2: otherwise, read the file (fs.readFileSync, 'utf8') and JSON.parse it
}

function addNote(text) {
  // TODO 3: get the current notes with readNotes()

  // TODO 4: push a new object { text, createdAt: new Date().toISOString() }

  // TODO 5: write the updated array back to FILE with
  //   fs.writeFileSync(FILE, JSON.stringify(notes, null, 2))
}

module.exports = { addNote, readNotes };
