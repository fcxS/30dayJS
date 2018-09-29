let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    //limpiar todo lo que haya
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayTimeEnd(then);
    // console.log({now,then});
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            alert('ITS TIME TO STOP TIMEWASTING');
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remindersSeconds = seconds % 60;
    const display = `${minutes}:${remindersSeconds < 10 ? '0':''}${remindersSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayTimeEnd(timeStamp) {
    const end = new Date(timeStamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Volve a las ${hours}:${minutes < 10 ? '0':''}${minutes}`;
    
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}
buttons.forEach(button => button.addEventListener('click',startTimer));
document.customForm.addEventListener('submit',function (e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})
