console.log("Hello world!");

/*
Exercise section 1 [Query Selector Challenges Solution]
Use querySelector or querySelectorAll to select:
- Banner image.
- H1 text.
- All list items.
- Done items.
- Not-done items 
- All buttons
- Done button.
- Not-done button.
*/
// Add your js code below here!
const banner = document.querySelector(".banner");
const h1 = document.querySelector("h1");
const firstDoneItem = document.querySelector(".done");
const all_done_items = document.querySelectorAll(".done");
const all_not_done_items = document.querySelectorAll(".not-done");
const buttons = document.getElementsByTagName("button");
const btnDone = document.getElementById("done-all-btn");
const btnNotDone = document.getElementById("not-done-all-btn");


/*
Exercise section 2 [Manipulating Element Challenges]
Using JS to make these changes:
- Get h1 text and change its text value and color.
- Get second list item text and change its value.
- Get the image link url and change it to another link.
- Change all list items to be done.
- Change all list items from done to be not done and vice versa.
*/
// Add your js code below here!
//- Get h1 text and change its text value and color.
h1.innerHTML = "My todo list this week";
h1.style.color = "red";
//- Get second list item text and change its value.
const second_item = document.querySelectorAll("li")[1];
second_item.innerHTML = "Take a walk";
//-- Get the image link url and change it to another link.
banner.setAttribute("src", "https://images.pexels.com/photos/2736499/pexels-photo-2736499.jpeg");
//- Change all list items to be done.
const lis = document.querySelectorAll("li");
// for (let li of lis) {
//     li.classList.replace("not-done", "done");
// }
//- Change all list items from done to be not done and vice versa.
for (let i = 0; i < lis.length; i++) {
    if (lis[i].classList.contains("done")) {
        lis[i].classList.replace("done", "not-done");
    } else if (lis[i].classList.contains("not-done")) {
        lis[i].classList.replace("not-done", "done");
    }
}
/*
Exercise section 3 [EventListener Challenges]
Using addEventListener() to handle these events:
- Clicking on the button “Done All” makes all list items to be done.
- Clicking on the button “Not Done All” makes all list items to be done.
- Clicking on any item list will make the item toggle from done to not done or vice versa.
*/
// Add your js code below here!
//- Clicking on the button “Done All” makes all list items to be done.
btnDone.addEventListener('click', () => {
    for(let li of lis) {
        if(!li.classList.contains("done")) {
            li.classList.toggle("done");
        }
        if(li.classList.contains("not-done")) {
            li.classList.toggle("not-done");
        }
    }
});
//- Clicking on the button “Not Done All” makes all list items to be done.
btnNotDone.addEventListener("click", () => {
    lis.forEach(function(li) {
        if(!li.classList.contains("not-done")) {
            li.classList.toggle("not-done");
        }
        if(li.classList.contains("done")) {
            li.classList.toggle("done");
        }
    })
});
//- Clicking on any item list will make the item toggle from done to not done or vice versa.
for(let li of lis) {
    li.addEventListener("click", () => {
            li.classList.toggle("not-done");
            li.classList.toggle("done");
    });
}


