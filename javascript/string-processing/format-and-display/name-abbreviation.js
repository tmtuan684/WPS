/**
 * script to prompt user for fullname
 * and make an abbreviation of the input name 
 * by extracting first letter of each word in the input name
 * e.g., Tran Minh Tuan -> TMT
 */
let fullname = prompt("What's your name?");

if(fullname != null && fullname.length > 0) {

    // split fullname into separate words
    let words = fullname.split(" ");
    let abbr = '';  // abbreviation
    
    // extract first letter of each word 
    for(let i = 0; i<words.length; i++) {
        abbr = abbr + words[i].charAt(0);
    }

    // Make the abbreviation uppercase
    abbr = abbr.toUpperCase();
    console.log(`Hello, ${abbr}`);
}
else {
    console.log("What's your name again?");
}