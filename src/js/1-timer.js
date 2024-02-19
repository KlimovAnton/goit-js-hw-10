import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  valueDays: document.querySelector('.value[data-days]'),
  valueHours: document.querySelector('.value[data-hours]'),
  valueMinutes: document.querySelector('.value[data-minutes]'),
  valueSeconds: document.querySelector('.value[data-seconds]'),
}

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if(this.now.getTime() > selectedDates[0].getTime()) {
      iziToast.warning({
        position: 'topRight',
        message: '"Please choose a date in the future"',
    });
      refs.btnStart.setAttribute('disabled', 'disabled')
    } else {
      refs.btnStart.removeAttribute('disabled')
    }
  },
});

class Timer {
  constructor({onTick}) {
    this.intervalId = null;
    this.onTick = onTick;
  }

  start() { 
    refs.btnStart.setAttribute('disabled', 'disabled');
    refs.input.setAttribute('disabled', 'disabled'); 

    const dateValue = new Date(refs.input.value);
    const timestamp = dateValue.getTime()
    
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = timestamp - currentTime
      const { days, hours, minutes, seconds } = this.convertMs(deltaTime);
      
      this.onTick({ days, hours, minutes, seconds })
      if(deltaTime < 1000) {
        clearInterval(this.intervalId)
      }
    }, 1000);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = this.pad(Math.floor(ms / day));
    const hours = this.pad(Math.floor((ms % day) / hour));
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
  pad(value) {
    return String(value).padStart(2, "0")
  }
}

const timer = new Timer({
  onTick: updateClockFace,
})

function updateClockFace( { days, hours, minutes, seconds }) {
  refs.valueDays.textContent = days;
  refs.valueHours.textContent = hours;
  refs.valueMinutes.textContent = minutes;
  refs.valueSeconds.textContent = seconds; 
}

refs.btnStart.addEventListener('click', timer.start.bind(timer));