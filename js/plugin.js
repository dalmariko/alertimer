
/*TODO обработать событие формы перевести время в секунды и отобразить дни и когда закончится таймер*/

function Timer(timerContainerSelector, timeEndContainerSelector,audioSrc) {
    let countdown;

    let timerContainer = document.querySelector(timerContainerSelector);
    let endTimeContainer = document.querySelector(timeEndContainerSelector);
    let audio = new Audio(audioSrc);

    /*
     * Функция запуска таймера
     * @param {number} seconds
     */
    this.start = function (seconds) {
        /*TODO проверку на число.*/

        clearInterval(countdown);

        const now = Date.now();
        const then = now + seconds * 1000;

        displayTimeLeft(seconds);
        displayEndTime(then);

        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);

            if (secondsLeft < 0) {
                audio.play();
                displayEndTime(then);
                clearInterval(countdown);
                return;
            }

            displayTimeLeft(secondsLeft);

        }, 1000);


    };

    // const testValue ='sdfldj';

    /*TODO Описание*/
    this.stop= function () {
        clearInterval(countdown);
        timerContainer.innerHTML = '';
        endTimeContainer.innerHTML = '';
        document.title = '';
        audio.pause();
        audio.currentTime = 0;

       /*TODO подумать о коментариях*/
        // console.log(testValue);
        // console.log(this);
    };

    /*
     * Функция для вывода таймера в разметку Принимает секунды и выводит их в разметрку в правильном формате.
     * @param {number}seconds
     * @return {void}
     *
     */
    function displayTimeLeft(seconds) {

        const h = seconds / 3600 ^ 0;
        const m = (seconds - h * 3600) / 60 ^ 0;
        const s = seconds - h * 3600 - m * 60;
        const hou = `${h < 10 ? '0' : ''}${h}:`;

        const display = `${h ? hou : ''}${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;

        document.title = display;
        timerContainer.textContent = display;
    }

    /*
     *Функция вывода времени окончания таймера в разметку
     * @param{number} timestemp -время окончания работы траймера
     *
     * */
    function displayEndTime(then) {
        let date = new Date(then);
        let hours = date.getHours();
        let minutes = date.getMinutes();

        endTimeContainer.textContent = `Be back at ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }



}

const btns = document.querySelectorAll('[data-time]');

const stopBtn = document.querySelector('.stop_timer');

const formSendTime = document.forms['customForm'];
const minutes=formSendTime['minutes'];

const myTimer = new Timer('.display__time-left', '.display__end-time','audio/bell.mp3');

/*TODO Описать функцию*/

function startTimerOnClick(e) {
    const seconds = parseFloat(this.dataset.time);
    myTimer.start(seconds);
}

function sendTime(e) {
    e.preventDefault();
    const seconds = minutes.value*60;
    myTimer.start(seconds);
    formSendTime.reset();
}


//
// function stopTimerOnclick(e) {
// myTimer.stop();
// }



btns.forEach (btn=>btn.addEventListener('click',startTimerOnClick));


formSendTime.addEventListener('submit',sendTime);

/*TODO потеря контекста ВСПОМНИТЬ*/
stopBtn.addEventListener('click',myTimer.stop.bind(myTimer));


