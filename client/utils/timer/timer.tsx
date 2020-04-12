class TimerLib {
    duration: any;
    durationLeft: any;
    zeroes: boolean;
    events: { onTick: any; onEnd: any; };
    _interval:any;
    hours: any;
    minutes: any;
    seconds: any;
    days: any;
    /**
     * @constructor
     * @description Creates a human-readable timer
     * @param {object} config  
     * @example
     * const timer = new TimerLib({
            seconds: 7200, // 2 hour long duration
            zeroes: false, // won't turn 5 mins into 05 mins
            onEnd: () => console.log("END"),
            onTick: () => console.log(timer.hours, timer.minutes, timer.seconds)
        });
    */
    constructor({ seconds = 30, zeroes = true, onTick, onEnd } = {}) {
        this.duration = this.durationLeft = seconds;
        this.zeroes = zeroes;
        this.events = { onTick, onEnd };
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.days = 0;

        this._updateTime();
        return this;
    }
    /**
     * @description starts the timer
     * @return {object} this
    */
    start() {
        this.stop();
        this._interval = setInterval(this._tick, 1000);
        return this;
    }
    /**
    * @description stops the timer
    */
    stop() {
        clearInterval(this._interval);
    }
    /**
     * @description restarts the timer
     * @param {number} duration optional new duration of the timer
     * @return {object} this
    */
    restart(duration) {
        this.durationLeft = duration || this.duration;
        this.start();
    }
    _addZeroes = (x) => {
        const num = String(x);
        if (!this.zeroes) return num;
        return x >= 10 ? num : "0" + num
    };
    _updateTime = () => {
        // console.log(this.durationLeft)
        let  seconds = Math.floor(this.durationLeft / 1000);
        let  minutes = Math.floor(seconds / 60);
        let  hours = Math.floor(minutes / 60);
        let  days = Math.floor(hours / 24);
    
        hours %= 24;
        minutes %= 60;
        seconds %= 60;
    
        // $("#days").text(days);
        // $("#hours").text(hours);
        // $("#minutes").text(minutes);
        // $("#seconds").text(seconds);

        // const days = parseInt(this.durationLeft / 60 / 60 / 24);

        // const hours = parseInt(this.durationLeft / 60 / 60 / 2);
        
        // const minutes = parseInt(this.durationLeft / 60 % 60);
        // const seconds = this.durationLeft % 60;

        this.hours = this._addZeroes(hours);
        this.minutes = this._addZeroes(minutes);
        this.seconds = this._addZeroes(seconds);
        this.days = this._addZeroes(days);
    };
    _tick = () => {
        const { onTick, onEnd } = this.events;

        this._updateTime();
        if (onTick) onTick();
        if (this.durationLeft <= 0) {
            this.stop();
            if (onEnd) onEnd();
        } else {
            this.durationLeft--;
        }
    }
}

export default TimerLib;