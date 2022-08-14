const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.body,
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
refs.stopBtn.disabled = true;

let intervalId = 0;

function onStartBtnClick(e) {
  e.target.disabled = true;
  refs.stopBtn.disabled = false;
  intervalId = setInterval(colorSwitcher, 1000);
}

function onStopBtnClick(e) {
  clearInterval(intervalId);
  e.target.disabled = true;
  refs.startBtn.disabled = false;
}

function colorSwitcher() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
