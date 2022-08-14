import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timerFace: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

let selectedTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0];
    if (selectedTime > options.defaultDate) {
      refs.startBtn.disabled = false;
    } else {
      //   window.alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future');
    }

    return;
  },
};

const flatpickr = new flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onStartTimer);

function onStartTimer() {
  const startTime = selectedTime.getTime();
  refs.startBtn.disabled = true;

  setInterval(() => {
    const deltaTime = startTime - Date.now();
    const timeComponents = convertMs(deltaTime);
    console.log(timeComponents);
    updateTimerFace(timeComponents);
  }, 1000);
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
