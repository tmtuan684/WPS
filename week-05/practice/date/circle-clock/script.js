document.addEventListener("DOMContentLoaded", () => {
    const clock = document.querySelector(".clock");
    const hour = document.querySelector(".hour");
    const minute = document.querySelector(".minute");
    const second = document.querySelector(".second");

    // add 12 marks
    for(let i = 0; i < 12; i++) {
        let deg = 360 / 12 * i;
        let div = document.createElement("div");
        div.classList.add('clock-mark');

        div.style.transform = `rotate(${deg}deg)`;
        clock.appendChild(div);
    }

    setInterval(() => {
        /** Time to degree */
        let now = new Date();

        // Time in seconds
        let time = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

        // Convert time into degree for hour, minute, and second hand
        let secondDeg = time * 6;
        let minuteDeg = time / 10;
        let hourDeg = time / 120;

        hour.style.transform = `rotate(${hourDeg + 180}deg)`;
        minute.style.transform = `rotate(${minuteDeg + 180}deg)`;
        second.style.transform = `rotate(${secondDeg + 180}deg)`;
    }, 1000);
})