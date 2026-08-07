// Exercise 3.6 — Mini Project: Async Note-Taking CLI
// This module handles reading/writing notes.json.
const fs = require('fs').promises;
const path = require('path');

const NOTES_FILE = path.join(__dirname, 'notes.json');

// TODO: async function loadNotes()
//   - Try to read and JSON.parse NOTES_FILE.
//   - If the file doesn't exist yet (catch the error), return an empty array
//     instead of throwing.
async function loadNotes() {
  // TODO
}

// TODO: async function saveNotes(notes)
//   - JSON.stringify the notes array and write it to NOTES_FILE.
async function saveNotes(notes) {
  // TODO
}

// TODO: async function addNote(text)
//   - Load existing notes, push a new { text, createdAt } object,
//     then save.
async function addNote(text) {
  // TODO
}

// TODO: async function removeNote(index)
//   - Load existing notes, remove the note at the given index,
//     then save. Handle an out-of-range index gracefully.
async function removeNote(index) {
  // TODO
}

module.exports = { loadNotes, saveNotes, addNote, removeNote };
