/** Words */
let str = "abcdefghijklmnopqrstuvwxyz";

let substr1 = "abc";

let substr2 = "xyz";

let substr3 = "mn";

console.log("Original string: " + str + "\n");

console.log("Length: " + str.length + " characters");

console.log("Content type: " + typeof str);

console.log("Does the string start with " + substr1 + "? " + str.startsWith(substr1));

console.log("Does the string start with " + substr2 + "? " + str.startsWith(substr2));

console.log("Does the string end with " + substr2 + "? " + str.endsWith(substr2));

console.log("Does the string end with " + substr1 + "? " + str.endsWith(substr1));

console.log("Does the string include " + substr3 + "? " + str.includes(substr3));

console.log("String in uppercase: " + str.toUpperCase());

console.log("Characters of this string are: \n");

for(let i=0; i<str.length; i++) {
    console.log(str[i] + "\n");
}


