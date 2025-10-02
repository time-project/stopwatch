let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval = null;
let running = false;
let lapCounter = 1;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");

function updateDisplay(time) {
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((time % (1000 * 60)) / 1000);
  let centiseconds = Math.floor((time % 1000) / 10);

  display.textContent =
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds + "." +
    (centiseconds < 10 ? "0" : "") + centiseconds;
}

startBtn.addEventListener("click", () => {
  if (!running) {
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(() => {
      updatedTime = new Date().getTime();
      difference = updatedTime - startTime;
      updateDisplay(difference);
    }, 10);

    startBtn.textContent = "Stop";
    startBtn.classList.add("stop");
    lapBtn.classList.add("enabled");
    lapBtn.classList.remove("disabled");
    running = true;
  } else {
    clearInterval(timerInterval);
    startBtn.textContent = "Start";
    startBtn.classList.remove("stop");
    lapBtn.textContent = "Reset";
    running = false;
  }
});

lapBtn.addEventListener("click", () => {
  if (!lapBtn.classList.contains("enabled")) return;

  if (running) {
    let li = document.createElement("li");
    li.innerHTML = `<span>Lap ${lapCounter++}</span><span>${display.textContent}</span>`;
    laps.prepend(li);
  } else {
    // Reset
    difference = 0;
    updateDisplay(0);
    laps.innerHTML = "";
    lapBtn.textContent = "Lap";
    lapBtn.classList.remove("enabled");
    lapBtn.classList.add("disabled");
    lapCounter = 1;
  }
});
