document.addEventListener("DOMContentLoaded", (e) => {
    const clock = document.getElementById("clock");
    
    setInterval(() => {
        let now = new Date();
        clock.textContent =  now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    }, 1000);
})

