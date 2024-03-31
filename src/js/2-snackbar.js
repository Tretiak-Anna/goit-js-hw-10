// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

const stateDictionary = {
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formDataObj = Object.fromEntries(formData.entries());

  makePromise(formDataObj)
    .then(({ delay, state }) => {
      iziToastAct(delay, state);
    })
    .catch(({ delay, state }) => {
      iziToastAct(delay, state);
    });

  event.target.reset();
}

function iziToastAct(delay, state) {
  const message =
    state === stateDictionary.FULFILLED
      ? `✅ Fulfilled promise in ${delay}ms`
      : `❌ Rejected promise in ${delay}ms`;
  const bgColor = state === stateDictionary.FULFILLED ? '#b6d7a8' : '#EA9999';

  iziToast.show({
    icon: false,
    backgroundColor: `${bgColor}`,
    message: `${message}`,
    messageColor: 'black',
    messageSize: '16',
    position: 'topRight',
    close: false,
    displayMode: 1,
  });
}

function makePromise({ delay, state }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === stateDictionary.FULFILLED) {
        resolve({ delay, state });
      } else {
        reject({ delay, state });
      }
    }, Number(delay));
  });
}
