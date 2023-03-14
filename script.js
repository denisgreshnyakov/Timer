window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const breakLength = document.querySelector("#break-length");
  const sessionLength = document.querySelector("#session-length");
  const timeLeft = document.querySelector("#time-left");
  let timerLabel = document.querySelector("#timer-label");
  const time = document.querySelector(".timer");

  const breakIncrement = document.querySelector("#break-increment");
  const breakDecrement = document.querySelector("#break-decrement");
  const sessionIncrement = document.querySelector("#session-increment");
  const sessionDecrement = document.querySelector("#session-decrement");

  const startStop = document.querySelector("#start_stop");
  const reset = document.querySelector("#reset");

  // const audio = new Audio();
  // audio.id = "beep";
  // audio.preload = "auto";
  // audio.src =
  //   "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav";

  let timer;
  let left = null;
  let timeMinutes;
  let pause = true;
  let checkBreak = false;
  let timerStarted = false;

  const sessionTimer = (length, label) => {
    //проверка на паузу
    if (pause) {
      clearInterval(timer);
      left = timeMinutes + 1;
      console.log(`Установка паузы`);
      console.log(`timeMinutes ${timeMinutes}`);
      console.log(`left ${left}`);
      return;
    }
    timerLabel.innerHTML = label;
    //проверка на предыдущее значение
    if (left !== null) {
      timeMinutes = left - 1;
      console.log("была пауза и есть предыдущее значение");
      console.log(`timeMinutes ${timeMinutes}`);
      console.log(`left ${left}`);
    } else {
      timeMinutes = length * 60 + 1;
      console.log("старт и нет предыдущего значения");
      console.log(`timeMinutes ${timeMinutes}`);
      console.log(`left ${left}`);
    }

    timer = setInterval(function () {
      let seconds = timeMinutes % 60;
      let minutes = (timeMinutes / 60) % 60;
      if (timeMinutes < 0) {
        clearInterval(timer);
        timeLeft.classList.remove("lastMinute");
        timerLabel.classList.remove("lastMinute");
        time.children[0].play();
        // audio.play();
        if (timerStarted) {
          checkBreak = !checkBreak;
          left = null;
        }
        if (!checkBreak) {
          sessionTimer(sessionLength.innerHTML, "Session");
        } else {
          sessionTimer(breakLength.innerHTML, "Break");
        }

        return;
      } else {
        let strTimer = null;
        if (timeMinutes >= 600) {
          if (seconds < 10) {
            strTimer = `${Math.trunc(minutes)}:0${seconds}`;
          } else {
            strTimer = `${Math.trunc(minutes)}:${seconds}`;
          }
        }
        if (timeMinutes < 600 && timeMinutes >= 60) {
          if (seconds < 10) {
            strTimer = `0${Math.trunc(minutes)}:0${seconds}`;
          } else {
            strTimer = `0${Math.trunc(minutes)}:${seconds}`;
          }
        } else if (timeMinutes < 60 && timeMinutes > 9) {
          timeLeft.classList.add("lastMinute");
          timerLabel.classList.add("lastMinute");
          strTimer = `0${Math.trunc(minutes)}:${seconds}`;
        } else if (timeMinutes < 10) {
          strTimer = `0${Math.trunc(minutes)}:0${seconds}`;
        }
        timeLeft.innerHTML = strTimer;
      }
      console.log(`секунд осталось ${timeMinutes}`);
      --timeMinutes;
    }, 1000);
  };

  startStop.addEventListener("click", () => {
    pause = !pause;
    timerStarted = true;
    if (!checkBreak) {
      // checkBreak = !checkBreak;
      sessionTimer(sessionLength.innerHTML, "Session");
    } else {
      // checkBreak = !checkBreak;
      sessionTimer(breakLength.innerHTML, "Break");
    }
  });

  reset.addEventListener("click", () => {
    breakLength.innerHTML = 5;
    sessionLength.innerHTML = 25;
    timeLeft.innerHTML = "25:00";
    clearInterval(timer);
    timeLeft.classList.remove("lastMinute");
    timerLabel.classList.remove("lastMinute");
    timerLabel.innerHTML = "Session";
    left = null;
    pause = true;
    checkBreak = false;
    timerStarted = false;
    time.children[0].pause();
    time.children[0].currentTime = 0;
  });

  const breakTimer = () => {};

  breakIncrement.addEventListener("click", () => {
    if (
      breakLength.innerHTML < 60 &&
      ((!timerStarted && pause) || (timerStarted && pause))
    ) {
      breakLength.innerHTML = ++breakLength.innerHTML;
      if (breakLength.innerHTML < 10 && timerLabel.innerHTML === "Break") {
        timeLeft.innerHTML = `0${breakLength.innerHTML}:00`;
        left = breakLength.innerHTML * 60 + 1;
      } else if (
        breakLength.innerHTML >= 10 &&
        timerLabel.innerHTML === "Break"
      ) {
        timeLeft.innerHTML = `${breakLength.innerHTML}:00`;
        left = breakLength.innerHTML * 60 + 1;
      }
    }
  });
  breakDecrement.addEventListener("click", () => {
    if (
      breakLength.innerHTML > 1 &&
      ((!timerStarted && pause) || (timerStarted && pause))
    ) {
      breakLength.innerHTML = --breakLength.innerHTML;
      if (breakLength.innerHTML < 10 && timerLabel.innerHTML === "Break") {
        timeLeft.innerHTML = `0${breakLength.innerHTML}:00`;
        left = breakLength.innerHTML * 60 + 1;
      } else if (
        breakLength.innerHTML >= 10 &&
        timerLabel.innerHTML === "Break"
      ) {
        timeLeft.innerHTML = `${breakLength.innerHTML}:00`;
        left = breakLength.innerHTML * 60 + 1;
      }
    }
  });
  sessionIncrement.addEventListener("click", () => {
    if (
      sessionLength.innerHTML < 60 &&
      ((!timerStarted && pause) || (timerStarted && pause))
    ) {
      sessionLength.innerHTML = ++sessionLength.innerHTML;
      if (sessionLength.innerHTML < 10 && timerLabel.innerHTML === "Session") {
        timeLeft.innerHTML = `0${sessionLength.innerHTML}:00`;
        left = sessionLength.innerHTML * 60 + 1;
      } else if (
        sessionLength.innerHTML >= 10 &&
        timerLabel.innerHTML === "Session"
      ) {
        timeLeft.innerHTML = `${sessionLength.innerHTML}:00`;
        left = sessionLength.innerHTML * 60 + 1;
      }
    }
  });
  sessionDecrement.addEventListener("click", () => {
    if (
      sessionLength.innerHTML > 1 &&
      ((!timerStarted && pause) || (timerStarted && pause))
    ) {
      sessionLength.innerHTML = --sessionLength.innerHTML;
      if (sessionLength.innerHTML < 10 && timerLabel.innerHTML === "Session") {
        timeLeft.innerHTML = `0${sessionLength.innerHTML}:00`;
        left = sessionLength.innerHTML * 60 + 1;
      } else if (
        sessionLength.innerHTML >= 10 &&
        timerLabel.innerHTML === "Session"
      ) {
        timeLeft.innerHTML = `${sessionLength.innerHTML}:00`;
        left = sessionLength.innerHTML * 60 + 1;
      }
    }
  });
});
