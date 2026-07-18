/**
 * Function to return the first number of characters of a given text
 */
let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.";

/**
 * 
 * @param {*} text 
 * @param {*} maxLength 
 * @returns 
 * How to:
 * Step 1. Extract a substring  that is from character at index 0 to index maxLength - 1
 * Step 2. To avoid substring containing half-cut word, find the last space character in the substring
 * Step 3. Remove redundant space before or after the substring
*/
function preview(text, maxLength = 100) {
    
    let substring = text.slice(0,maxLength);
    let lastspace = substring.lastIndexOf(" "); 

    if (lastspace > 0) { // string after the lastspace might contain cut-word, therefore, remove text after the last space
        substring = substring.slice(0, lastspace);
    } 

    substring = substring.trim() + "..."

    return substring;
}

console.log(preview(text));