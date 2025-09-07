const questions = document.querySelectorAll(".question");

for(let q of questions) {
    q.addEventListener("click", (e) => {
        const answer= e.target.nextElementSibling;
        const allAns = document.querySelectorAll(".answer");
        for(let a of allAns) {
            if (a !== answer) {
                a.classList.remove("show");
            }
        }
        answer.classList.toggle("show");
    });
}