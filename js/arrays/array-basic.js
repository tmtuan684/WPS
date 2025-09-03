/**
 * Basic array declaration and operations in JavaScript
 */
// Declare an array
let fruits = ["apple", "banana", "orange"];

// Access array elements
console.log(fruits[0]); // Output: apple
console.log(fruits[1]); // Output: banana
console.log(fruits[2]); // Output: orange

// Modify an array element
fruits[1] = "strawberry";
console.log(fruits[1]); // Output: strawberry
// Add a new element to the array
fruits.push("grape");
console.log(fruits[3]); // Output: grape

// Remove an element from the array
fruits.splice(0, 1);
console.log(fruits[0]); // Output: strawberry

// Access the updated array
console.log(fruits); // Output: ["strawberry", "orange", "grape"]

// Search for an element in the array
let searchTerm = "orange";
let index = fruits.indexOf(searchTerm);
if (index !== -1) {
    console.log(`Found ${searchTerm} at index ${index}`);
} else {
    console.log(`${searchTerm} not found in the array`);
}

//For loop to iterate over the array
for (let i = 0; i < fruits.length; i++) {
    console.log(`Fruit at index ${i}: ${fruits[i]}`);
}

//Iterate over the array using forEach
fruits.forEach((fruit, index) => {
    console.log(`Fruit at index ${index}: ${fruit}`);
});

//map
let upperCaseFruits = fruits.map(fruit => fruit.toUpperCase());
console.log(upperCaseFruits); // Output: ["STRAWBERRY", "ORANGE", "GRAPE"]

//algorithm, sorting the array
fruits.sort();
console.log(fruits); // Output: ["grape", "orange", "strawberry"]   

//reverse
fruits.reverse();
console.log(fruits); // Output: ["strawberry", "orange", "grape"]

//filter
let filteredFruits = fruits.filter(fruit => fruit.startsWith("g"));
console.log(filteredFruits); // Output: ["grape"]

