// Exercise 2.2 — Directory Import (Solution)
//
// To try this file: rename it to "index.js" (removing "-SOLUTION"), then run
// 2.2-app.js from the parent folder.

module.exports = {
  ...require('./math-utils.js'),
  ...require('./string-utils.js')
};
