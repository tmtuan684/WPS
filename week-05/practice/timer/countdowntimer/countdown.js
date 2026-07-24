/**
 * Algorithm
 * Convert hour: minute: second to seconds
 * For every second passed, substract seconds by 1
 * convert seconds left to hour: minute: second
 * display time
 */
const time = document.getElementById("time");
const btn = document.getElementById("countdown");
const hhmmss = document.getElementById("hhmmss");
btn.disabled = true;

time.addEventListener("focus", (e) => {
    if(time.value !== "") {
        btn.disabled = false;
    }
});
time.addEventListener("keydown", (e) => {
     if(time.value !== "") {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
});

// Listen to btn click to start counting down
btn.addEventListener('click', (e) => {
    timeElm = time.value.split(":");
    
    timeElm.forEach(elm => elm = parseInt(elm));

    var sec = toSecond(timeElm[0], timeElm[1], timeElm[2]);
    console.log(`Seconds: ${sec}`);
    const timerId = setInterval(function() {
        hhmmss.textContent = tohhmmss(sec);
        if (sec === 0) {
            clearInterval(timerId);
            alert("Time's up");
        } else {
            sec--;
        }
        
        
    }, 1000);
    
    
});

function toSecond(hours, minutes,seconds) {
    return parseInt(hours * 3600) + parseInt(minutes * 60) + parseInt(seconds);
}

function tohhmmss(sec) {

    sec = parseInt(sec)
    let hr = parseInt(sec / 3600);
    sec = sec % 3600;
    let min = parseInt(sec / 60);
    sec = sec % 60;
    return `${hr}:${min}:${sec}`;
}
