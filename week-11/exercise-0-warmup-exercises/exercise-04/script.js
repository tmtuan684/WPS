const btn = document.getElementById("theme-toggle");

var lightMode = "☀ Light Mode";
var darkMode = "🌙 Dark Mode";

btn.addEventListener("click", (e) => {
    const body = document.querySelector("body");
    
    e.target.textContent = (e.target.textContent === darkMode) ? lightMode: darkMode;
    
    body.classList.toggle("dark");
});