"use strict";


app.controller("workoutViewCtrl", function($scope, $routeParams, DbFactory, WorkoutFactory, TimeFormatFactory){

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
			$scope.lap_metric = workoutsArray[0].lap_metric;
			makeMetricAbrv($scope.lap_metric);
			$scope.discipline = workoutsArray[0].discipline;
			makeDiscIcon($scope.discipline);
			$scope.description = workoutsArray[0].description;

			athletesArray = WorkoutFactory.createAthletesArray(workouts);

			$scope.displayName = athletesArray[currentAthlete].name;
			$scope.calcTimes = calcTimes($scope.totalLaps, athletesArray[currentAthlete].lapTimes);

			const timesArray = formatTimes(athletesArray[currentAthlete].lapTimes);
			$scope.displayTimes = makeDisplayArray($scope.totalLaps, timesArray)

		})

	const formatTimes = (timesArray) => {
		const formattedArray = timesArray.map((each) => {
			return TimeFormatFactory.fromMs(each)
		})
		return formattedArray;
	}

	const makeDisplayArray = (laps, array) => {
		const displayArray = [];
		for (let i = 1; i < laps + 1; i ++) {
			const newObj = {};
			newObj.lapNum = i;
			newObj.lapTime = array[i - 1];
			displayArray.push(newObj)
		}
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
		calcObj.totalTime = formatArray[0];
		calcObj.avgTime = formatArray[1];
		return calcObj
	}

	const makeMetricAbrv = (metric) => {
		if (metric === 'mile') {
			$scope.metricAbrv = 'mi';
		} else if (metric === 'meter') {
			$scope.metricAbrv = 'm';
		} else if (metric === 'yard') {
			$scope.metricAbrv = 'yd';
		} else $scope.metricAbrv = 'km';
	}

	const makeDiscIcon = (disc) => {
		if (disc === 'run') {
			$scope.discIcon = 'directions_run';
		} else if (disc === 'bike') {
				$scope.discIcon = 'directions_bike';
			} else $scope.discIcon = 'pool';
	}

});
