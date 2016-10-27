"use strict";

app.controller("timerCtrl", function($scope){

	const readout = document.getElementById('readout');
	const readout1 = document.getElementById('readout1');
	console.log("readout1", readout1);
	// const athletesDb = [
	// 	{
	// 		id: 1,
	// 		first_name: 'Makenna',
	// 		last_name: 'Reilly',
	// 		display_name: 'Makenna',
	// 		age: 12,
	// 		group_id: 1,
	// 		avg_pace: '8:30'
	// 	},
	// 	{
	// 		id: 2,
	// 		first_name: 'Lucy',
	// 		last_name: 'Rutherford',
	// 		display_name: 'Lucy',
	// 		age: 12,
	// 		group_id: 1,
	// 		avg_pace: '8:15'
	// 	}
	// ]

	$scope.athleteArray = [
		{
			name: 'athlete one',
			lapTimesArray: [0],
			readout: '00:00.00'
		}
	]

	// $scope.lapArray1 =[0];
	// $scope.lapArray2 =[0];

	// const watch = new Stopwatch(readout, $scope.athleteArray, 0);
	const watch = new Stopwatch(readout);

	const watchAthlete = new Stopwatch(readout1);

	$scope.start = function() {
	  watch.start();
	  watchAthlete.start();
	}

	$scope.stop = function() {
	  watch.stop();
	  watchAthlete.stop();
	}

	$scope.reset = function() {
	  watch.reset();
	  $scope.lapArray1 = [0];
	  // $scope.lapArray2 = [0];
	}

	$scope.recordLap = function(array) {
		// let currentArray = `lapArray${id}`
		// console.log("pressed lap for", currentArray);
	  array.push(watchAthlete.lap())
	  // console.log("lapArray", $scope.lapArray);
	}

});
