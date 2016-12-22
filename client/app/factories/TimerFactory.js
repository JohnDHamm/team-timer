"use strict";

app.factory("TimerFactory", function($q) {

	function timeFormatter(timeInMilliseconds) {
		let time = new Date(timeInMilliseconds);
		let minutes = time.getMinutes().toString();
		let seconds = time.getSeconds().toString();
		let milliseconds = Math.round((time.getMilliseconds() / 10)).toString().slice(0,2);

		if (seconds.length < 2) {
			seconds = '0' + seconds;
		}
		while (milliseconds.length < 2) {
			milliseconds = '0' + milliseconds;
		}
		return minutes + ':' + seconds + '.' + milliseconds;
	}

	function timeFormatterMMSS(timeInMilliseconds) {
		let time = new Date(timeInMilliseconds);
		let minutes = time.getMinutes().toString();
		let seconds = time.getSeconds().toString();

		if (seconds.length < 2) {
			seconds = '0' + seconds;
		}
		return minutes + ':' + seconds;
	}

	return { timeFormatter, timeFormatterMMSS }

});
