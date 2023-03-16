window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  //получение элементов на странице
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

  //переменные для работы таймера
  let timer; //переменная для таймера
  let left = null; //переменная для записи оставшегося времени при паузе/запуске
  let timeMinutes; // переменная для записи количества секунд
  let pause = true; // логическая переменная для проверки паузы
  let checkBreak = false; // логическая переменная для проверки перерыва
  let timerStarted = false; // логическая переменная для проверки запуска таймера

  //функция инициализации таймера
  const initialTimer = (length, label) => {
    //проверка на паузу
    if (pause) {
      clearInterval(timer);
      left = timeMinutes;
      return;
    }
    //меняем надпись перерыва/сессии
    timerLabel.innerHTML = label;
    //проверка на предыдущее значение
    if (left !== null) {
      timeMinutes = left; // перезаписываем предыдущее значение
    } else {
      timeMinutes = length * 60; // вычисляем количество секунд
      timerFunction(); //запускаем функцию таймера для первой секунды
    }
    // запускаем таймер
    timer = setInterval(timerFunction, 1000);
  };

  //функция выполняющаяся во время работы таймера
  const timerFunction = () => {
    let seconds = timeMinutes % 60;
    let minutes = (timeMinutes / 60) % 60;

    //если время вышло, то завершаем работу, переходи в другой режим
    if (timeMinutes < 0) {
      clearInterval(timer);
      timeLeft.innerHTML = `0${Math.trunc(minutes)}:0${seconds}`;
      timeLeft.classList.remove("lastMinute");
      timerLabel.classList.remove("lastMinute");
      time.children[0].play();
      if (timerStarted) {
        checkBreak = !checkBreak;
        left = null;
      }
      if (!checkBreak) {
        initialTimer(sessionLength.innerHTML, "Session");
      } else {
        initialTimer(breakLength.innerHTML, "Break");
      }
      return;
    }
    // иначе отображаем полученные данные, пока не истекло время
    else {
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
    --timeMinutes;
  };

  //нажатие паузы/старта
  startStop.addEventListener("click", () => {
    pause = !pause;
    timerStarted = true;
    if (!checkBreak) {
      initialTimer(sessionLength.innerHTML, "Session");
    } else {
      initialTimer(breakLength.innerHTML, "Break");
    }
  });

  //сброс всех параметров в значение по умолчанию
  reset.addEventListener("click", () => {
    clearInterval(timer);
    //сброс времени, длинны и наименования сессий по умолчанию
    breakLength.innerHTML = 5;
    sessionLength.innerHTML = 25;
    timeLeft.innerHTML = "25:00";
    timerLabel.innerHTML = "Session";

    //сброс стилей
    timeLeft.classList.remove("lastMinute");
    timerLabel.classList.remove("lastMinute");

    // сброс значений переменных в первоначальное состояние
    left = null;
    pause = true;
    checkBreak = false;
    timerStarted = false;

    //остановка аудио таймера и установка значения звуковой дорожки на 0
    time.children[0].pause();
    time.children[0].currentTime = 0;
  });

  // функция для установки новых значений при изменении длины сессии
  const setNewValue = (value, mode) => {
    if (value < 10 && timerLabel.innerHTML === mode) {
      timeLeft.innerHTML = `0${value}:00`;
      left = value * 60;
    } else if (value >= 10 && timerLabel.innerHTML === mode) {
      timeLeft.innerHTML = `${value}:00`;
      left = value * 60;
    }
  };

  // обработка событий при нажатии на кнопки изменения количества длины сессии
  breakIncrement.addEventListener("click", () => {
    if (
      breakLength.innerHTML < 60 &&
      ((!timerStarted && pause) || (timerStarted && pause))
    ) {
      breakLength.innerHTML = ++breakLength.innerHTML;
      setNewValue(breakLength.innerHTML, "Break");
    }
  });
  breakDecrement.addEventListener("click", () => {
    if (
      breakLength.innerHTML > 1 &&
      ((!timerStarted && pause) || (timerStarted && pause))
    ) {
      breakLength.innerHTML = --breakLength.innerHTML;
      setNewValue(breakLength.innerHTML, "Break");
    }
  });
  sessionIncrement.addEventListener("click", () => {
    if (
      sessionLength.innerHTML < 60 &&
      ((!timerStarted && pause) || (timerStarted && pause))
    ) {
      sessionLength.innerHTML = ++sessionLength.innerHTML;
      setNewValue(sessionLength.innerHTML, "Session");
    }
  });
  sessionDecrement.addEventListener("click", () => {
    if (
      sessionLength.innerHTML > 1 &&
      ((!timerStarted && pause) || (timerStarted && pause))
    ) {
      sessionLength.innerHTML = --sessionLength.innerHTML;
      setNewValue(sessionLength.innerHTML, "Session");
    }
  });
});
