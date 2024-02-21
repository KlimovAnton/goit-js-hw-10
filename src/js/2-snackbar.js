import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formElement = document.querySelector('.form')

formElement.addEventListener('submit', handleStart)
function handleStart(event) {
    event.preventDefault();
    
    const form = event.currentTarget
    const delay = form.elements['delay'].value
    const inputFulfilled = form.elements.state.value
    form.reset()

    onPromise(delay, inputFulfilled)
        .then(onResolved)
        .catch(onRejected)
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

function onPromise(delay, inputFulfilled) {
    return new Promise((onResolved, onRejected) => {
        setTimeout(() => {
            if(inputFulfilled === 'fulfilled') {
                onResolved(delay)
            } else {
                onRejected(delay)
            }
        }, delay);
    })
}
