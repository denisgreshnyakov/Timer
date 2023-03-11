window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const breakLength = document.querySelector("#break-length");
  const sessionLength = document.querySelector("#session-length");
  const timeLeft = document.querySelector("#time-left");

  const breakIncrement = document.querySelector("#break-increment");
  const breakDecrement = document.querySelector("#break-decrement");
  const sessionIncrement = document.querySelector("#session-increment");
  const sessionDecrement = document.querySelector("#session-decrement");

  const startStop = document.querySelector("#start_stop");
  const reset = document.querySelector("#reset");

  let bLength = 5;
  let sLength = 25;
  let minutes = 0;
  let seconds = 0;

  breakIncrement.addEventListener("click", () => {
    if (breakLength.innerHTML < 60) {
      breakLength.innerHTML = ++breakLength.innerHTML;
    }
  });
  breakDecrement.addEventListener("click", () => {
    if (breakLength.innerHTML > 1) {
      breakLength.innerHTML = --breakLength.innerHTML;
    }
  });
  sessionIncrement.addEventListener("click", () => {
    if (sessionLength.innerHTML < 60) {
      sessionLength.innerHTML = ++sessionLength.innerHTML;
      if (sessionLength.innerHTML < 10) {
        timeLeft.innerHTML = `0${sessionLength.innerHTML}:00`;
      } else {
        timeLeft.innerHTML = `${sessionLength.innerHTML}:00`;
      }
    }
  });
  sessionDecrement.addEventListener("click", () => {
    if (sessionLength.innerHTML > 1) {
      sessionLength.innerHTML = --sessionLength.innerHTML;
      if (sessionLength.innerHTML < 10) {
        timeLeft.innerHTML = `0${sessionLength.innerHTML}:00`;
      } else {
        timeLeft.innerHTML = `${sessionLength.innerHTML}:00`;
      }
    }
  });
  startStop.addEventListener("click", () => {
    let timeMinut = sessionLength.innerHTML * 60;
    const timer = setInterval(function () {
      let seconds = timeMinut % 60; // Получаем секунды
      let minutes = (timeMinut / 60) % 60; // Получаем минуты
      // Условие если время закончилось то...
      if (timeMinut <= 0) {
        // Таймер удаляется
        clearInterval(timer);
        // Выводит сообщение что время закончилось
        // alert("Время закончилось");
      } else {
        // Иначе
        // Создаём строку с выводом времени
        let strTimer = `${Math.trunc(minutes)}:${seconds}`;
        // Выводим строку в блок для показа таймера
        timeLeft.innerHTML = strTimer;
      }
      --timeMinut; // Уменьшаем таймер
    }, 1000);
  });
  reset.addEventListener("click", () => {
    breakLength.innerHTML = 5;
    sessionLength.innerHTML = 25;
    timeLeft.innerHTML = "25:00";
  });

  const breakTimer = () => {};
});
