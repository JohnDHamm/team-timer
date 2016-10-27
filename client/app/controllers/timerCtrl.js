"use strict";

app.controller("timerCtrl", function($scope){

	const readout = document.getElementById('readout');
	$scope.lapArray =[]

	const watch = new Stopwatch(readout);

	$scope.start = function() {
	  watch.start();
	}

	$scope.stop = function() {
	  watch.stop();
	}

	$scope.reset = function() {
	  watch.reset();
	  $scope.lapArray = []
	}

	$scope.recordLap = function() {
	  $scope.lapArray.push(watch.lap())
	  // console.log("lapArray", $scope.lapArray);
	}

});
