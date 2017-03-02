'use strict';

app.factory("TimeFormatFactory", function($q) {

	const HOUR = 3600000
	const MINUTE = 60000
	const SECOND = 1000

	function fromMs (ms, format = 'mm:ss.sss') {
		if (typeof ms !== 'number' || Number.isNaN(ms)) {
			throw new Error('NaN error')
		}

		let absMs = Math.abs(ms)

		let negative = (ms < 0)
		let hours = Math.floor(absMs / HOUR)
		let minutes = Math.floor(absMs % HOUR / MINUTE)
		let seconds = Math.floor(absMs % MINUTE / SECOND)
		let milliseconds = Math.floor(absMs % SECOND)

		return formatTime({
			negative, hours, minutes, seconds, milliseconds
		}, format)
	}

	function fromS (s, format = 'mm:ss') {
		if (typeof s !== 'number' || Number.isNaN(s)) {
			throw new Error('NaN error')
		}

		let ms = s * SECOND

		return fromMs(ms, format)
	}

	function toMs (time) {
		const re = /^(-)?(?:(\d\d+):)?(\d\d):(\d\d)(\.\d+)?$/

		let result = re.exec(time)
		if (!result) throw new Error()

		let negative = result[1] === '-'
		let hours = result[2] | 0
		let minutes = result[3] | 0
		let seconds = result[4] | 0
		let milliseconds = Math.floor(1000 * result[5] | 0)

		if (minutes > 60 || seconds > 60) {
			throw new Error()
		}

		return (negative ? -1 : 1) * (
			hours * HOUR + minutes * MINUTE + seconds * SECOND + milliseconds
		)
	}

	function toS (time) {
		let ms = toMs(time)
		return Math.floor(ms / SECOND)
	}

	function formatTime (time, format) {
		let showHr
		let showMs

		switch (format.toLowerCase()) {
			case 'hh:mm:ss.sss':
				showHr = true
				showMs = true
				break
			case 'hh:mm:ss':
				showHr = true
				showMs = !(!time.milliseconds)
				break
			case 'mm:ss':
				showHr = !(!time.hours)
				showMs = !(!time.milliseconds)
				break
			case 'mm:ss.sss':
				showHr = !(!time.hours)
				showMs = true
				break
			default:
				throw new Error('Invalid time format')
		}

		let hh = time.hours
		let mm = time.minutes
		let ss = time.seconds
		let sss = time.milliseconds

		let ssString = ss.toString();
		if (ssString.length < 2) {
			ssString = '0' + ssString;
		}

		if (ss.length < 2) {
			ss = '0' + ss;
		}

		let msString = Math.round(sss / 10).toString();
		// if (sss === 0) {
		// 	msString = "00";
		// }
		if (msString.length < 2) {
			msString += '0';
		}

		return (time.negative ? '-' : '') + (showHr ? (
			showMs ? `${hh}:${mm}:${ss}.${msString}` : `${hh}:${mm}:${ss}`
		) : (
			showMs ? `${mm}:${ssString}.${msString}` : `${mm}:${ss}`
		))
	}

	function dateFormatter (date) {
		// format month + day
		let dateNew = new Date(date);
		let dateToStr = dateNew.toString().split(' ');
		let cleanDate = dateToStr[1] + ' ' + dateToStr[2] ;
		// format time
		let now = new Date(date)
		let time = [ now.getHours(), now.getMinutes()];
		let suffix = ( time[0] < 12 ) ? "AM" : "PM";
		time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
		time[0] = time[0] || 12;
		for ( var i = 1; i < 3; i++ ) {
			if ( time[i] < 10 ) {
				time[i] = "0" + time[i];
			}
		}

		return cleanDate + " " + time.join(":") + " " + suffix;

	}

	return { fromMs, fromS, toMs, toS, dateFormatter };

});
