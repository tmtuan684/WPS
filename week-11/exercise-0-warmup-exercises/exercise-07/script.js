const cards = document.getElementsByClassName("card");
    
for(let card of cards) {
    card.addEventListener("click", (e) => {
        if (e.target.matches(".dismiss")) {
            e.target.parentNode.remove();
        }
    });
}