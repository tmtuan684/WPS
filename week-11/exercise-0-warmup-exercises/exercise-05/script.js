const textarea = document.getElementById("tweet");

textarea.addEventListener("input", (e) => {
    const counter = document.getElementById("counter");
    let count = parseInt(e.target.value.length);

    counter.textContent = count.toString() + "/280" ;

    if (count >= 260 && !counter.classList.contains("warning")) {
        counter.classList.add("warning");
    } else if (count < 260) {
        counter.classList.remove("warning");
    }
});