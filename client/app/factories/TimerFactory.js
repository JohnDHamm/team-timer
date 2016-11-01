"use strict";

app.factory("TimerFactory", function($q) {

	function timeFormatter(timeInMilliseconds) {
		let time = new Date(timeInMilliseconds);
		let minutes = time.getMinutes().toString();
		let seconds = time.getSeconds().toString();
		let milliseconds = Math.round((time.getMilliseconds() / 10)).toString().slice(0,2);
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



	return { timeFormatter }

});
