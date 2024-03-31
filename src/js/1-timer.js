// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;

const startBtn = document.querySelector('button');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

startBtn.addEventListener('click', onClickStartTimer);

function onClickStartTimer() {
  const currentDate = Date.now();
  const selectedDate = userSelectedDate.getTime();
  const deltaTime = selectedDate - currentDate;
  startCountdown(deltaTime);
}

try {
  startBtn.disabled = true;
} catch (error) {
  console.log('Button is not found');
}

function convertMs(deltaTime) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(deltaTime / day);
  const hours = Math.floor((deltaTime % day) / hour);
  const minutes = Math.floor((deltaTime % hour) / minute);
  const seconds = Math.floor((deltaTime % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const { days, hours, minutes, seconds } = value;
  timerDays.textContent = days.toString().padStart(2, '0');
  timerHours.textContent = hours.toString().padStart(2, '0');
  timerMinutes.textContent = minutes.toString().padStart(2, '0');
  timerSeconds.textContent = seconds.toString().padStart(2, '0');
}

function startCountdown(deltaTime) {
  const countDown = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    addLeadingZero({ days, hours, minutes, seconds });
    deltaTime -= 1000;
    if (deltaTime < 0) {
      clearInterval(countDown);
    }
  }, 1000);
}

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    checkDate(userSelectedDate);
    console.log(userSelectedDate);

    const ms = userSelectedDate.getTime() - Date.now();
    const countDown = setTimeout(() => {}, ms);
  },
});

function checkDate(selectedDate) {
  if (!selectedDate) {
    return;
  }

  if (selectedDate.getTime() < Date.now()) {
    iziToast.show({
      title: 'ERROR',
      titleColor: 'red',
      titleSize: '24px',
      message: 'Please choose a date in the future',
      messageSize: '16px',
      backgroundColor: '#B51B1B',
      position: 'center',
      closeOnEscape: true,
      timeout: 3000,
      overlay: true,
      overlayClose: true,
    });
    startBtn.disabled = true;
  } else {
    startBtn.disabled = false;
  }
}
