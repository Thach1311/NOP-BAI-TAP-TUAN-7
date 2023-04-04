//StopWatch
function Stopwatch(elem) {
    var time = 0;
    var offset;
    var interval;


    function update() {
        if (this.isOn) {
            time += delta();
        }
        elem.textContent = timeFormatter(time);
    }

    function delta() {
        var now = Date.now();
        var timePassed = now - offset;

        offset = now;

        return timePassed;
    }

    function timeFormatter(time) {
        time = new Date(time);

        var seconds = time.getSeconds().toString();
        var minutes = time.getMinutes().toString();
        var milliseconds = time.getMilliseconds().toString();

        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }

        if (seconds.length < 2) {
            seconds = '0' + seconds;
        }

        while (milliseconds.length < 3) {
            milliseconds = '0' + milliseconds;
        }

        var result = minutes + ' : ' + seconds + ' . ' + milliseconds;

        return result;
    }

    this.start = function() {
        interval = setInterval(update.bind(this), 1);
        offset = Date.now();
        this.isOn = true;
    };

    this.stop = function() {
        clearInterval(interval);
        interval = null;
        this.isOn = false;
    };

    this.reset = function() {
        time = 0;
        lapContainer.innerHTML = '';
        interval = null;
        this.isOn = false;
        update();
    };


    this.isOn = false;
}

//Main
var $ = document;
var timer = $.querySelector('.timer');
var toggleBtn = $.querySelector('.toggle');
var resetBtn = $.querySelector('.reset');
var pauseBtn = $.querySelector('.pause');
var lapContainer = $.querySelector('.lapContainer')

var watch = new Stopwatch(timer);

function start() {
    watch.start();
}

function stop() {

    watch.stop();
}

function stopWhenOn() {
    toggleBtn.textContent = 'Start';
    toggleBtn.classList.toggle("on")
    watch.stop();
    watch.reset();
}

toggleBtn.addEventListener('click', function() {
    watch.isOn ? stop() : start();
});

resetBtn.addEventListener('click', function() {
    watch.isOn ? stopWhenOn() : watch.reset();
});

pauseBtn.addEventListener('click', function() {
    watch.isOn ? watch.stop() : watch.stopWhenOn();
})