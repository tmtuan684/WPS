/**
 * script to prompt user for fullname
 * and make an abbreviation of the input name 
 * by extracting first letter of each word in the input name
 * e.g., Tran Minh Tuan -> TMT
 */
let fullname = prompt("What's your name?");

if(fullname != null && fullname.length > 0) {

    let abbr = fullname.split(" ") // "tran minh tuan" -> ["tran","minh","tuan"]
                        .map(word => word.charAt(0).toUpperCase()) // ["T", "M", "T"]
                        .join(""); // ["T", "M", "T"] -> "TMT"
    console.log(`Hello, ${abbr}`); 
}
else {
    console.log("What's your name again?");
}