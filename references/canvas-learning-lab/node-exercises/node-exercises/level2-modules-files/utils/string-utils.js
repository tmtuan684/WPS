// Provided module — no edits needed.
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function shout(str) {
  return str.toUpperCase() + '!';
}
module.exports = { capitalize, shout };
