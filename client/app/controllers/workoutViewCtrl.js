"use strict";

app.controller("workoutViewCtrl", function($scope, $routeParams, DbFactory, WorkoutFactory, TimeFormatFactory, DisplayFactory){

	const date = parseInt($routeParams.date);
	$scope.displayDate = TimeFormatFactory.dateFormatter(date);
	let currentAthlete = 0;
	$scope.firstAthlete = true;
	$scope.lastAthlete = false;
	let athletesArray = [];
	let totalAthletes = 1;

	DbFactory.getWorkoutsByDate(date)
		.then((workouts) => {
			const workoutsArray = workouts;
			totalAthletes = workoutsArray.length;
			$scope.totalLaps = workoutsArray[0].laps;
			$scope.lap_distance = workoutsArray[0].lap_distance;
			console.log("$scope.lap_distance", $scope.lap_distance);
			$scope.lap_metric = workoutsArray[0].lap_metric;
			makeMetricAbrv($scope.lap_metric);
			$scope.discIcon = DisplayFactory.getDiscIcon(workoutsArray[0].discipline);
			setPaceMetric(workoutsArray[0].discipline);
			$scope.description = workoutsArray[0].description;

			athletesArray = WorkoutFactory.createAthletesArray(workouts);

			$scope.displayName = athletesArray[currentAthlete].name;
			$scope.calcTimes = calcTimes($scope.totalLaps, athletesArray[currentAthlete].lapTimes);

			const timesArray = formatTimes(athletesArray[currentAthlete].lapTimes);
			console.log("athletesArray", athletesArray);
			$scope.displayTimes = makeDisplayArray($scope.totalLaps, timesArray, athletesArray[currentAthlete].lapTimes)

		})

	const formatTimes = (timesArray) => {
		const formattedArray = timesArray.map((each) => {
			return TimeFormatFactory.fromMs(each)
		})
		return formattedArray;
	}

	const makeDisplayArray = (laps, timesArray, lapSecondsArray) => {
		const displayArray = [];
		for (let i = 1; i < laps + 1; i ++) {
			const newObj = {};
			newObj.lapNum = i;
			const timeSplit = timesArray[i - 1].split('.')
			newObj.lapTime = timeSplit[0];
			newObj.lapMS = timeSplit[1];

			const lapPace = TimeFormatFactory.fromMs(lapSecondsArray[i - 1] * 100 / $scope.lap_distance);
			newObj.lapPace = lapPace;

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
		$scope.displayTimes = makeDisplayArray($scope.totalLaps, timesArray);
		$scope.calcTimes = calcTimes($scope.totalLaps, athletesArray[currentAthlete].lapTimes);
	}

	const calcTimes = (laps, array) => {
		const totalTime = array.reduce((a, b) => a + b)
		const avgTime = totalTime / laps;
		const formatArray = formatTimes([totalTime, avgTime])
		const calcObj = {};
		const totalTimeSplit = formatArray[0].split('.');
		calcObj.totalTime = totalTimeSplit[0];
		calcObj.totalTimeMs = totalTimeSplit[1];

		const avgTimeSplit = formatArray[1].split('.');
		calcObj.avgTime = avgTimeSplit[0];
		calcObj.avgTimeMs = avgTimeSplit[1];

		return calcObj
	}

	const makeMetricAbrv = (metric) => {
		switch (metric) {
			case 'mile':
				$scope.metricAbrv = 'mi';
				break;
			case 'meter':
				$scope.metricAbrv = 'm';
				break;
			case 'yard':
				$scope.metricAbrv = 'yd';
				break;
		}
	}

	const setPaceMetric = (discipline) => {
		switch (discipline) {
			case 'swim':
				$scope.paceMetric = '/100y';
				break;
			case 'bike':
				$scope.paceMetric = 'mph';
				break;
			case 'run':
				$scope.paceMetric = 'mile';
				break;
		}
	}

});
