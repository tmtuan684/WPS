const addBtn = document.querySelector("#add-btn");
const shoppinglist = document.querySelector("#shopping");
const input = document.querySelector("#item-input");

addBtn.addEventListener("click", addItem);
input.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        addItem();
    }
});


function addItem() {
    let placeholder = input.placeholder;
    if(input.value !== "") {
        // Remove whitespace at the start and end of input text
        input.value = input.value.trim();

        const li = document.createElement("li");
        li.textContent = input.value;

        shoppinglist.appendChild(li);

        // Focus on the input again for next input
        input.value = "";
        input.placeholder = placeholder;
        input.focus();
    }
}
