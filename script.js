let initialCount = 1 * 60;
let count = initialCount;
let timerPause = false;
let timerStart = false;
let initTimer = false;

const timerCountEl = document.querySelector(".timer-countdown");
const timerContainerEl = document.querySelector(".timer-container");
const startBtnEl = document.querySelector(".start-btn");
const optionsBtnEl = document.querySelector(".options-btn");
const timerLtEl = document.querySelector(".timer-lt");
const timerRtEl = document.querySelector(".timer-rt");
const setTimeInput = document.querySelector(".timer-setter");

function init() {
  timerLtEl.style.animation = `${+count + 1}s linear infinite timer-slide-lt`;
  timerRtEl.style.animation = `${+count + 1}s linear infinite timer-slide-rt`;
}

function toMilisecond(number) {
  if (number.toString().length < 2) {
    return "0" + number;
  }
  return number;
}

function startTimer() {
  init();
  function timer() {
    if (!timerPause) {
      count = count - 1;
      if (count <= -1) {
        count = initialCount;
        timerStart = true;
        pauseTimer();
        removeAnimation();
        optionsBtnEl.classList.add("done");
      }
      timerCountEl.textContent =
        Math.floor(count / 60) + ":" + toMilisecond(count % 60);
    }
  }

  setInterval(timer, 1000);
}

startBtnEl.addEventListener("click", () => {
  if (!initTimer) {
    if (timerPause) {
      pauseTimer();
    }
    initTimer = true;
    startTimer();
  } else {
    pauseTimer();
  }
});

function pauseTimer() {
  if (timerStart) {
    init();
    timerStart = false;
  }

  timerContainerEl.classList.toggle("pause");

  if (startBtnEl.textContent === "paused") {
    startBtnEl.textContent = "start";
    timerLtEl.style.animationPlayState = `running`;
    timerRtEl.style.animationPlayState = `running`;
  } else {
    startBtnEl.textContent = "paused";
    timerLtEl.style.animationPlayState = `paused`;
    timerRtEl.style.animationPlayState = `paused`;
  }

  timerPause = !timerPause;
}

optionsBtnEl.addEventListener("click", () => {
  if (optionsBtnEl.classList.contains("done")) {
    optionsBtnEl.classList.remove("done");
  }
  if (!timerPause) {
    pauseTimer();
  }
  setTimeInput.classList.toggle("show");
  setTimeInput.addEventListener("blur", () => {
    count = setTimeInput.value * 60;
    timerCountEl.textContent =
      Math.floor(count / 60) + ":" + toMilisecond(count % 60);
    setTimeInput.classList.remove("show");
    timerStart = true;
  });
});

function removeAnimation() {
  timerLtEl.style.animation = "none";
  timerRtEl.style.animation = "none";
  setTimeout(() => {
    timerLtEl.style.animation = "";
    timerRtEl.style.animation = "";
  }, 10);
}
