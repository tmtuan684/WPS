console.log("Hello world!");

// Add your js code below here!
const ul = document.querySelector("ul");
const lis = document.querySelectorAll("ul#item-list li");

// Add a new item to list
const input = document.getElementById("new-item");
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && input.value.trim() !== "") {
        let li = document.createElement('li');
        li.classList.add("item");
        li.textContent = input.value;
        
        // Add remove icon
        let removeBtn = document.createElement('span');
        removeBtn.className = "remove-btn";
        removeBtn.innerHTML = "X";
        li.appendChild(removeBtn);
        ul.appendChild(li);
        input.value = "";
        
        li.addEventListener("click", complete);
        removeBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            li.remove();
        });
    }
});

// Add listeners to initial items
document.querySelectorAll("ul#item-list li").forEach((li) => {
    li.addEventListener("click", complete);
    let btn = li.querySelector('.remove-btn');
    if (btn) {
        btn.addEventListener("click", function(e) {
            e.stopPropagation();
            li.remove();
        });
    }
});

function complete(e) {
    e.target.classList.toggle("completed");
}
