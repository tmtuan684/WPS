// Exercise 2.3 — A Tiny Notes Module (app file)
//
// This file is already complete. Point it at either the starter or solution
// notes module by changing the require path below.
//
// Run: node 2.3-app.js Buy more coffee for the office

const { addNote, readNotes } = require('./2.3-notes-solution.js');
// swap the line above for:
// const { addNote, readNotes } = require('./2.3-notes-starter.js');
// once you've filled in the TODOs, to test your own version.

const noteText = process.argv.slice(2).join(' ');
if (noteText) addNote(noteText);

console.log(readNotes());
