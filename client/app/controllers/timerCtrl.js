"use strict";

app.controller("timerCtrl", function($scope){

	const readout = document.getElementById('readout');

	$scope.athleteArray = [
		{
			index: 0,
			display_name: 'athlete one',
			athlete_id: 1,
			lapTimesArray: [0],
			readout: '00:00.00',
			lap: 0,
			elapsed: 0,
			lastLapTime: '00:00.00'
		},
		{
			index: 1,
			display_name: 'athlete two',
			athlete_id: 2,
			lapTimesArray: [0],
			readout: '00:00.00',
			lap: 0,
			elapsed: 0,
			lastLapTime: '00:00.00'
		},

	]

	var time = 0;
	var interval;
	var offset;
	var lapStart;

	$scope.start = function() {
		interval = setInterval(update, 10);
		offset = Date.now();
		lapStart = offset;
	}


	$scope.stop = function() {
	  // watch.stop();
		clearInterval(interval);
		interval = null;
	}


	$scope.recordLap = function(index) {
		const thisAthlete = $scope.athleteArray[index];
		thisAthlete.lap += 1;
		var nowLap = Date.now();
		var elapsedTime = nowLap - lapStart;
		thisAthlete.elapsed = elapsedTime;
		thisAthlete.lapTimesArray.push(elapsedTime);
		console.log("athlete:", thisAthlete.athlete_id);
		console.log("laps:", thisAthlete.lapTimesArray);
		thisAthlete.lastLapTime = timeFormatter(elapsedTime - thisAthlete.lapTimesArray[thisAthlete.lap - 1]);
		console.log("lastLapTime", thisAthlete.lastLapTime);
	}


	function update() {
		var timePassed = delta();
		time += timePassed;

		var formattedTime = timeFormatter(time);
		readout.textContent = formattedTime;
		$scope.$apply(function() {
			for (let i = 0; i < $scope.athleteArray.length; i++) {
				var newTime = time - $scope.athleteArray[i].elapsed;
				$scope.athleteArray[i].readout = timeFormatter(newTime);
			}
		});
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


});
