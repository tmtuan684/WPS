// Exercise 2.3 — Directory Import
function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = { capitalize };
