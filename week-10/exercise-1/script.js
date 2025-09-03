console.log("Hello world!");

// Add your js code below here!
const lis = document.querySelectorAll("ul#item-list li");

lis.forEach((li) => {
    li.addEventListener("click", ()=>{
        li.classList.toggle("completed");
    });
});