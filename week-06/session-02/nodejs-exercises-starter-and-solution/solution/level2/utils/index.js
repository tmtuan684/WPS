// Exercise 2.3 — Directory Import
// require('./utils') resolves to this file by default.
const stringUtils = require('./stringUtils');
const arrayUtils = require('./arrayUtils');
const dateUtils = require('./dateUtils');

module.exports = {
  ...stringUtils,
  ...arrayUtils,
  ...dateUtils,
};
