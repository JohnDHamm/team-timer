"use strict";


app.controller("workoutViewCtrl", function($scope, $routeParams, DbFactory, WorkoutFactory, TimeFormatFactory){

	// console.log("params", $routeParams);
	const date = $routeParams.date;
	$scope.displayDate = dateFormat(date);
	// console.log("date", $scope.displayDate);
	let currentAthlete = 0;
	$scope.firstAthlete = true;
	$scope.lastAthlete = false;
	let athletesArray = [];
	let totalAthletes = 1;

	DbFactory.getWorkoutsByDate(date)
		.then((workouts) => {
			const workoutsArray = workouts;
			totalAthletes = workoutsArray.length;
			console.log("totalAthletes", totalAthletes);
			$scope.totalLaps = workoutsArray[0].laps;
			$scope.lap_distance = workoutsArray[0].lap_distance;
			$scope.lap_metric = workoutsArray[0].lap_metric;
			$scope.discipline = workoutsArray[0].discipline;
			$scope.description = workoutsArray[0].description;

			athletesArray = WorkoutFactory.createAthletesArray(workouts);
			// console.log("athletesArray", athletesArray);

			$scope.displayName = athletesArray[currentAthlete].name;
			// const testArray = [510002,520030,515400,505025,500234]
			const timesArray = formatTimes(athletesArray[currentAthlete].lapTimes);


			$scope.displayTimes = makeDisplayArray($scope.totalLaps, timesArray)
			// $scope.displayTimes = formatTimes(testArray);
			console.log("$scope.displayTimes", $scope.displayTimes);
			// showTimes(workouts);

		})


	function dateFormat (date) {
		// console.log("date", date);
		const newDate = new Date(1477447627584)
		// console.log("newDate", newDate);
		const formattedDate = newDate;

		return formattedDate;
	}

	const formatTimes = (timesArray) => {
		const formattedArray = timesArray.map((each) => {
			return TimeFormatFactory.fromMs(each)
		})
		return formattedArray;
	}

	const makeDisplayArray = (laps, array) => {
		const displayArray = [];
		for (let i = 1; i < laps + 1; i ++) {
			console.log("array", i, array[i - 1]);
			const newObj = {};
			newObj.lapNum = i;
			newObj.lapTime = array[i - 1];
			displayArray.push(newObj)
		}
		console.log("displayArray", displayArray);
		return displayArray;
	}

	$scope.nextAthlete = () => {
		currentAthlete ++;
		$scope.firstAthlete = false;
		if (currentAthlete === totalAthletes - 1) {
			$scope.lastAthlete = true;

		}
		updateDisplay(currentAthlete);
	}

	$scope.prevAthlete = () => {
		currentAthlete --;
		$scope.lastAthlete = false;
		if (currentAthlete === 0) {
			$scope.firstAthlete = true;
		}
		updateDisplay(currentAthlete);
	}

	const updateDisplay = (currentAthlete) => {
		$scope.displayName = athletesArray[currentAthlete].name;
		const timesArray = formatTimes(athletesArray[currentAthlete].lapTimes);
		$scope.displayTimes = makeDisplayArray($scope.totalLaps, timesArray)
		// console.log("$scope.displayTimes", $scope.displayTimes);
	}

});
