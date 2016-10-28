"use strict";

app.controller("timerCtrl", function($scope){

	const readout = document.getElementById('readout');

	$scope.athleteArray = [
		{
			name: 'athlete one',
			id: 1,
			lapTimesArray: [0],
			readout: '00:00.00'
		},
		{
			name: 'athlete two',
			id: 2,
			lapTimesArray: [0],
			readout: '00:00.00'
		},

	]

	// const watch = new Stopwatch(readout);
	var time = 0;
	var interval;
	var offset;
	var lapStart;

	$scope.start = function() {
	  // watch.start();
		interval = setInterval(update, 10);
		offset = Date.now();
		lapStart = offset;
	}


	$scope.stop = function() {
	  // watch.stop();
		clearInterval(interval);
		interval = null;
	}


	// $scope.reset = function() {
	//   // watch.reset();
	// 	time = 0;
	// 	update();
	// }


	$scope.recordLap = function() {
		// let currentArray = `lapArray${id}`
		// console.log("pressed lap for", currentArray);
	  // array.push(watchAthlete.lap())
	  // console.log("lapArray", $scope.lapArray);
	}


	function update() {
		var timePassed = delta();
		time += timePassed;

		var formattedTime = timeFormatter(time);
		readout.textContent = formattedTime;
		$scope.$apply(function() {
			for (let i = 0; i < $scope.athleteArray.length; i++) {
				$scope.athleteArray[i].readout = formattedTime;
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
