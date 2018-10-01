function Timer(daysContainerSelector, timerContainerSelector, timeEndContainerSelector, audioSrc) {
    let countdown;

    let daysContainer = document.querySelector(daysContainerSelector);
    let timerContainer = document.querySelector(timerContainerSelector);
    let endTimeContainer = document.querySelector(timeEndContainerSelector);
    let audio = new Audio(audioSrc);

    /*
     * Функция запуска таймера
     * @param {number} seconds
     */
    this.start = function (seconds) {


        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        if (!isNumeric(seconds))return this.stop();

        clearInterval(countdown);

        const now = Date.now();
        const then = now + seconds * 1000;

        displayTimeLeft(seconds);
        displayEndTime(then);

        countdown = setInterval(() => {
            const secondsLeft = (then - Date.now()) / 1000 ^ 0;

            if (secondsLeft < 0) {
                audio.play();
                displayEndTime(then);
                clearInterval(countdown);
                return;
            }

            displayTimeLeft(secondsLeft);

        }, 1000);


    };


    /**
     *Фукция остоновки таймера
     */
    this.stop = function () {
        clearInterval(countdown);
        daysContainer.innerHTML = '';
        timerContainer.innerHTML = '';
        endTimeContainer.innerHTML = '';
        document.title = '';
        audio.pause();
        audio.currentTime = 0;
    };

    /*
     * Функция для вывода таймера в разметку Принимает секунды и выводит их в разметрку в правильном формате.
     * @param {number}seconds
     * @return {void}
     *
     */
    function displayTimeLeft(seconds) {

        const days = seconds / 86400 ^ 0;
        const h = (seconds - days * 86400) / 3600 ^ 0;
        const m = (seconds - days * 86400 - h * 3600) / 60 ^ 0;
        const s = seconds - days * 86400 - h * 3600 - m * 60;

        const hou = `${h < 10 ? '0' : ''}${h}:`;

        const display = `${h ? hou : ''}${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;

        const day = days < 1 ? '' : days + ' day`s';

        document.title = display;

        daysContainer.textContent = day;
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

const minutes = formSendTime['minutes'];

const myTimer = new Timer('.display__days-left', '.display__time-left', '.display__end-time', 'audio/bell.mp3');

/*
 *Функция берет значение из кастомного атрибута data-time
 * и запускает таймер.
 * */
function startTimerOnClick(e) {
    const seconds = parseFloat(this.dataset.time);
    myTimer.start(seconds);
}

/*
 *Функция берет значение из формы name = customForm
 * и запускает таймер.
 * */
function sendTime(e) {
    e.preventDefault();
    const seconds = minutes.value.slice(0, 120);
    myTimer.start(seconds * '60');
    formSendTime.reset();
}


btns.forEach(btn => btn.addEventListener('click', startTimerOnClick));

formSendTime.addEventListener('submit', sendTime);

stopBtn.addEventListener('click', myTimer.stop.bind(myTimer));


