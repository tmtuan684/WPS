console.log("Hello world!");

// Add your js code below here!
const itemList = document.querySelector('ul');

function handleItemClick(event) {
  const item = event.target;
  item.classList.toggle('completed');
}

itemList.addEventListener('click', handleItemClick);

