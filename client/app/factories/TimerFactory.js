"use strict";

app.factory("TimerFactory", function($q) {

	// var time = 0;
	// var interval;
	// var offset;

	// function update() {
	// 	if (this.isOn) {
	// 		var timePassed = delta();
	// 		time += timePassed;
	// 	}

	// 	var formattedTime = timeFormatter(time);
	// 	elem.textContent = formattedTime;
	// }

	// function delta() {
	// 	var now = Date.now();
	// 	var timePassed = now - offset;
	// 	offset = now;
	// 	return timePassed;
	// }

	// function timeFormatter(timeInMilliseconds) {
	// 	var time = new Date(timeInMilliseconds);
	// 	var minutes = time.getMinutes().toString();
	// 	var seconds = time.getSeconds().toString();
	// 	var milliseconds = time.getMilliseconds().toString();

	// 	if (minutes.length < 2) {
	// 		minutes = '0' + minutes;
	// 	}

	// 	if (seconds.length < 2) {
	// 		seconds = '0' + seconds;
	// 	}

	// 	while (milliseconds.length < 3) {
	// 		milliseconds = '0' + milliseconds;
	// 	}

	// 	return minutes + ' : ' + seconds + ' . ' + milliseconds;
	// }

	// // this.isOn = false;

	// const start = function() {
	// 	interval = setInterval(update.bind(this), 10);
	// 	offset = Date.now();
	// 		// this.isOn = true;
	// 	}
	// };

	// const stop = function() {
	// 	clearInterval(interval);
	// 	interval = null;
	// 	this.isOn = false;

	// };

	// this.reset = function() {
	// 	time = 0;
	// 	update();
	// };


	// return {start, stop, reset};

});
