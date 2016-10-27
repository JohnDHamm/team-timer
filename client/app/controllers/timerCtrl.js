"use strict";

app.controller("timerCtrl", function($scope){

	const readout = document.getElementById('readout');
	const athletes = [
		{
			id: 1,
			first_name: 'Makenna',
			last_name: 'Reilly',
			display_name: 'Makenna',
			age: 12,
			group_id: 1,
			avg_pace: '8:30'
		},
		{
			id: 2,
			first_name: 'Lucy',
			last_name: 'Rutherford',
			display_name: 'Lucy',
			age: 12,
			group_id: 1,
			avg_pace: '8:15'
		}
	]

	$scope.lapArray1 =[0];
	$scope.lapArray2 =[0];

	const watch = new Stopwatch(readout);

	$scope.start = function(totalAthletes) {
	  watch.start();
	}

	$scope.stop = function() {
	  watch.stop();
	}

	$scope.reset = function() {
	  watch.reset();
	  $scope.lapArray1 = [0];
	  $scope.lapArray2 = [0];
	}

	$scope.recordLap = function(array) {
		// let currentArray = `lapArray${id}`
		// console.log("pressed lap for", currentArray);
	  array.push(watch.lap())
	  // console.log("lapArray", $scope.lapArray);
	}

});
