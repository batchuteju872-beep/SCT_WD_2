// Variables to hold time values
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCounter = 1;

// Grab elements from the HTML page
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapsList"); // Lap list container

// Function to format time from milliseconds to 00:00:00.00 string
function formatTime(time) {
    let hrs = Math.floor(time / 3600000);
    let mins = Math.floor((time % 3600000) / 60000);
    let secs = Math.floor((time % 60000) / 1000);
    let ms = Math.floor((time % 1000) / 10);

    return (
        (hrs < 10 ? "0" + hrs : hrs) + ":" +
        (mins < 10 ? "0" + mins : mins) + ":" +
        (secs < 10 ? "0" + secs : secs) + "." +
        (ms < 10 ? "0" + ms : ms)
    );
}

// Update display text dynamically
function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

// START BUTTON CLICK EVENT
startBtn.addEventListener("click", () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10); // Updates every 10 milliseconds
        running = true;
    }
});

// PAUSE BUTTON CLICK EVENT
pauseBtn.addEventListener("click", () => {
    if (running) {
        clearInterval(timerInterval);
        running = false;
    }
});

// RESET BUTTON CLICK EVENT
resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    running = false;
    lapCounter = 1;
    display.textContent = "00:00:00.00";
    document.getElementById("lapsList").innerHTML = ""; // Clears laps listing
});

// LAP BUTTON CLICK EVENT
document.getElementById("lapBtn").addEventListener("click", () => {
    if (running) {
        const lapsList = document.getElementById("lapsList");
        const li = document.createElement("li");
        
        li.innerHTML = `<span>Lap ${lapCounter}</span> <span>${display.textContent}</span>`;
        lapsList.appendChild(li);
        
        // Auto-scroll to the bottom of the lap tracker view
        lapsList.scrollTop = lapsList.scrollHeight;
        lapCounter++;
    }
});