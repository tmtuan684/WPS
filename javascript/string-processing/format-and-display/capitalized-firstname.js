/** 
 * script to receive input name
 * than extract and capitalize the first name
 * and print the capitalized first name
*/

// prompt user for input name
let name = prompt("What's your name? ");

if (name != null && name.length > 0) {
    // get the firstname
    let firstname = name.split(" ")[0];

    // captilize first name 
    // that is to make the first letter uppercase and the following letter lowercase
    firstname = firstname[0].toUpperCase() + firstname.slice(1).toLowerCase();

    console.log(`Hello, ${firstname}`);
}
else {
    console.log("Sorry. I didn't catch your name. What's your name again?")
}