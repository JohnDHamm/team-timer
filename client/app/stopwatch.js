function Stopwatch(elem) {
	var time = 0;
	var interval;
	var offset;
	var lapStart;

	function update() {
		if (this.isOn) {
			var timePassed = delta();
			time += timePassed;
		}

		var formattedTime = timeFormatter(time);
		elem.textContent = formattedTime;
	}

	function delta() {
		var now = Date.now();
		var timePassed = now - offset;
		offset = now;
		return timePassed;
	}

	function timeFormatter(timeInMilliseconds) {
		var time = new Date(timeInMilliseconds);
		var minutes = time.getMinutes().toString();
		var seconds = time.getSeconds().toString();
		var milliseconds = (time.getMilliseconds() / 10).toFixed().toString();

		if (minutes.length < 2) {
			minutes = '0' + minutes;
		}

		if (seconds.length < 2) {
			seconds = '0' + seconds;
		}

		while (milliseconds.length < 2) {
			milliseconds = '0' + milliseconds;
		}

		return minutes + ':' + seconds + '.' + milliseconds;
	}

	this.isOn = false;

	this.start = function() {
		if (!this.isOn) {
			interval = setInterval(update.bind(this), 10);
			offset = Date.now();
			lapStart = offset;
			this.isOn = true;
		}
	};

	this.stop = function() {
		if (this.isOn) {
			clearInterval(interval);
			interval = null;
			this.isOn = false;
		}
	};

	this.reset = function() {
		time = 0;
		update();
	};

	this.lap = function() {
		const now = Date.now()
		// console.log("lap now", now);
		const elapsedTime = now - lapStart;
		// console.log("thisLapTime", thisLapTime);
		const formattedLapTime = timeFormatter(elapsedTime);
		// lapStart = now;
		time = 0;
		return elapsedTime;
	}
}
