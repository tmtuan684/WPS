/**
 * Array Sorting
 * Insertion Sort Algorithm 
 * Idea of this algorithm: 
 *      A list that needs sorting is always partially sorted. 
 *      To sort the entire list, we simply pick each item one by one and insert it into the already-sorted portion 
 *      so that the list remains sorted at every step.
 */

function insertionSort(a) {
    // Provide sorted array of k-1 item from a[0] to a[k-1]
    for(let k = 1; k < a.length; k++) {
        for(var p=k-1; p >=0 && a[p] > a[k]; p--) 
            a[p+1] = a[p]
        a[p+1] = x;
    } 
}

let a = [5, -32, 14, 6, 8, 30];
let x = 5;
/**
 * Problem 1
 * Insert a integer into an ascending order array so that the array remains sorted in ascending order
 * a = [1,3,7,8,10]
 * x = 5
 * a = [1,3,5,7,8,10]
 */
function addMaintain(a, x) {
    pos = a.length-1;   
    while(pos >=0 && a[pos] > x) {
        a[pos+1] = a[pos];
        pos--;
    }
    a[pos+1] = x;
}
function addMaintain2(a,x) {
    for(let pos=a.length; pos>=0 && a[pos>x]; pos--) {
        a[pos+1] = a[pos];
    }
    a[post+1] = x;
}
console.log(a.toString());
insertionSort(a);
console.log(a.toString());

