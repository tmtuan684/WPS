// script.js - shared script used by all pages
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  console.log(`Page loaded: ${path}`);
  const info = document.getElementById('page-info');
  if (info) {
    info.textContent = `You are viewing: ${path}`;
  }
});
