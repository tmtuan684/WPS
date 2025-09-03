/**
 * Examples for js objects
 */

let book = {};
book = {
    title: "Javascript - The definitive Guide",
    published: 2011,
    keywords: ["javascript", "programming", "web"],
    author: {
        firstname: "David",
        lastname: "Flanagan"
    }
};

// Accessing object properties
console.log(book.title);          // "Javascript - The definitive Guide"
console.log(book["published"]);   // 2011
console.log(book.keywords[0]);    // "javascript"
console.log(book.author.firstname); // "David"

// adding new properties
book.isbn = "978-1449393854";
book.pages = 600;

// For..in
for (let key in book) {
    console.log(key + ": " + book[key]);
}

// Object.keys

// ["title", "published", "keywords", "author", "isbn", "pages"]
console.log(Object.keys(book)); 

Object.keys(book).forEach(key => {
    console.log(key + ": " + book[key]);
});


