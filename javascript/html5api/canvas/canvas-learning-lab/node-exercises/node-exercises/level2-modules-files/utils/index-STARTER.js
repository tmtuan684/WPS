// Exercise 2.2 — Directory Import
//
// require() can load an entire FOLDER as one module, by looking for an index.js
// file inside it automatically. That means:
//   const utils = require('./utils');
// ...will load THIS file (once you rename it to index.js).
//
// TODO: merge the exports of math-utils.js and string-utils.js into one object,
// and set it as this file's module.exports, so a single require('./utils') call
// gives access to add, multiply, capitalize, and shout all at once.
//
// Hint: the object spread syntax works great here:
//   module.exports = { ...require('./math-utils.js'), ...require('./string-utils.js') };
//
// To try this file: rename it to "index.js" (removing "-STARTER"), then run
// 2.2-app.js from the parent folder.
