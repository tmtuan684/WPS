/** Count number of li */
const items = document.querySelectorAll(".tasks > li");

console.log(`There are ${items.length} tasks.`);

/** Change background color of odd index to light-grey */
for(let i = 0; i < items.length; i++) {
    if( i % 2 !== 0) 
        items[i].style.backgroundColor = "lightgrey";
}