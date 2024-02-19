import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    inputDelay: document.querySelector('.input-delay-js'),
    inputFulfilled: document.querySelector('.input-fulfilled-js'),
    inputRejected: document.querySelector('.input-rejected-js'),
    btnCreate: document.querySelector('button')
}

refs.btnCreate.addEventListener('click', handleStart)
function handleStart(event) {
    onPromise().then(onResolved).catch(onRejected)
    event.preventDefault();
}

function onResolved(delay) {
    iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        icon: '',
    });
}

function onRejected(delay) {
    iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        icon: '',
    });
}

function onPromise() {
    const delay = refs.inputDelay.value
    const inputFulfilled = refs.inputFulfilled.checked
    const inputRejected = refs.inputRejected.checked
    
    refs.inputRejected.checked = false;
    refs.inputFulfilled.checked = false;
    refs.inputDelay.value = '';
    return new Promise((res, rej) => {
        setTimeout(() => {
            if(inputFulfilled) {
                res(delay)
                
            } else if (inputRejected) {
                rej(delay)
                
            }
        }, delay);
    })
}