// Exercise 3.6 — Mini Project: Async Note-Taking CLI
// This module handles reading/writing notes.json.
const fs = require('fs').promises;
const path = require('path');

const NOTES_FILE = path.join(__dirname, 'notes.json');

async function loadNotes() {
  try {
    const content = await fs.readFile(NOTES_FILE, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // File doesn't exist yet — treat as an empty notebook.
      return [];
    }
    throw err;
  }
}

async function saveNotes(notes) {
  await fs.writeFile(NOTES_FILE, JSON.stringify(notes, null, 2));
}

async function addNote(text) {
  const notes = await loadNotes();
  const note = { text, createdAt: new Date().toISOString() };
  notes.push(note);
  await saveNotes(notes);
  return note;
}

async function removeNote(index) {
  const notes = await loadNotes();
  if (index < 0 || index >= notes.length) {
    throw new Error(`No note at index ${index}. There are ${notes.length} note(s).`);
  }
  const [removed] = notes.splice(index, 1);
  await saveNotes(notes);
  return removed;
}

module.exports = { loadNotes, saveNotes, addNote, removeNote };
