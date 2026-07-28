/** Global variables */
num = shuffle();
emptycellIndex = undefined;
board = document.getElementById('board');
result = document.getElementById('result');

/* Game Logic */
/** Shuffle the board ensuring it is solvable */
function shuffle() {
    let a = [1,2,3,4,5,6,7,8,0];
    do {
        // Fisher–Yates shuffle: randomize the array in place
        for (let i = a.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            [a[i], a[r]] = [a[r], a[i]];
        }
    } while (!isSolvable(a) || isWin(a)); // repeat if unsolvable or already solved
return a;
}
/** Check if the board arrangement is solvable 
     Knowledge: An inversion is a pair of tiles (a,b) that are in the wrong order when you look at the board as a flat 1D array.
    For an odd-sized board, a board with an odd number of inversion is unsolvable
*/
function isSolvable(board) {
    var inversion = 0;
    for(let i = 0; i < board.length-1; i++) {
        for (let j = i + 1; j < board.length; j++)
        if (board[i] > board[j]) {
            inversion++;    
        }
    }
    return inversion % 2 === 0 ? true: false; 
}
/** Check if cells are properly arranged == Check if array is sorted */
function isWin(a) {
    let isWin = true;
    for(let i = 0; i < a.length-2 && isWin; i++) {
        if(a[i] > a[i+1]) isWin = false;
    }
    return isWin;
} 
/** Move a numeric cell to empty space */
function move(e) {
    
    // Check whether Next door to Cell e is Empty Cell
    let i = e.target.getAttribute('array-index');
    if(isAdjacent(num, i, emptycellIndex)) {
        console.log(`Check (${i}, ${emptycellIndex}); move ${e.target.textContent}`);
        swap(num, i, emptycellIndex)
        // let temp = num[i];
        // num[i] = num[emptycellIndex];
        // num[emptycellIndex] = temp;
        // emptycellIndex = i;
        renderGameBoard();
        if (isWin(num)) {
            congratulate();
        }
    } else {
        console.log(`Check (${i}, ${emptycellIndex}); Cannot move ${e.target.textContent}`);
    }
}
/** Check if board[i] and [j] are adjcent
 * [i] is adjacent to [j] when: abs(i - j) == n, n is sqrt(board.length)
*/
function isAdjacent(board, i,j) {
    const n = Math.floor(Math.sqrt(board.length));
    return ((Math.abs(i-j) === n) || Math.abs(i-j) === 1) ? true : false;
}
/**
 * Show congratulation pane the winner
 */
function congratulate() {
    result.textContent = "YOU WIN!";
    result.classList.toggle("win");
    }
/** Swap 2 items at index i and j in an array */ 
function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
/**
 * Prepare game board cells and display them on screen
 */
function renderGameBoard() {
    const gameboard = document.createElement("div");
    gameboard.className = "gameboard";
    // add cell to the board
    num.forEach((val, i) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('aria-label', val === 0 ? 'Empty Cell' : `Cell ${val}`);
        cell.setAttribute('array-index', i);
        if (val === 0) {
            emptycellIndex = i;
            cell.classList.add('cell-empty');
            cell.innerHTML = '&nbsp;'; // keep height
        } else {
            cell.textContent = val;
        }
        cell.addEventListener('click', move);
        gameboard.appendChild(cell);
    });
    board.innerHTML = "";
    board.appendChild(gameboard);
}
document.addEventListener("DOMContentLoaded", renderGameBoard);