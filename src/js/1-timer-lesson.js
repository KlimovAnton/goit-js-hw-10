const refs = {
  startBtn: document.querySelector('button[data-action-start]'),
  stopBtn: document.querySelector('button[data-action-stop]'),
  rebootBtn: document.querySelector('button[data-action-reboot'),
  clockface: document.querySelector('.js-clockface'),
};

class Timer {
  constructor({onTick}) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;

    this.init();
  }

  init() {
    const { hours, mins, secs } = this.getTimeComponents(0);
    this.onTick({ hours, mins, secs })
  }

  start() { 
    if (this.isActive) {
      return
    }

    const startTime = Date.now();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const { hours, mins, secs } = this.getTimeComponents(deltaTime);
      
      this.onTick({ hours, mins, secs })
      
      // updateClockFace({ hours, mins, secs })
    }, 1000);
  }

  stop() {
    this.isActive = false 
    clearInterval(this.intervalId)
  }

  reboot() {
    this.isActive = false 
    clearInterval(this.intervalId)
    const { hours, mins, secs } = this.getTimeComponents(0);
    this.onTick({ hours, mins, secs })
  }

  getTimeComponents(time) {
    const hours = 
      this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
    ;
    const mins = 
      this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)))
    ;
    const secs = 
      this.pad(Math.floor((time % (1000 * 60)) / 1000))
  ;
  
    return { hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0")
  }
  
}

const timer = new Timer({
  onTick: updateClockFace,
})

function updateClockFace( {hours, mins, secs} ) {
  refs.clockface.textContent = `${hours}:${mins}:${secs}`;
}

refs.startBtn.addEventListener(`click`, timer.start.bind(timer))

refs.stopBtn.addEventListener(`click`, timer.stop.bind(timer))

refs.rebootBtn.addEventListener(`click`, timer.reboot.bind(timer))
