"use strict";

app.controller("workoutViewCtrl", function($scope, $routeParams, DbFactory, WorkoutFactory, TimeFormatFactory, DisplayFactory){

	const date = parseInt($routeParams.date);
	$scope.displayDate = TimeFormatFactory.dateFormatter(date);
	let currentAthlete = 0;
	$scope.firstAthlete = true;
	$scope.lastAthlete = false;
	let athletesArray = [];
	let totalAthletes = 1;
	let lapDistConv;

	DbFactory.getWorkoutsByDate(date)
		.then((workouts) => {
			const workoutsArray = workouts;
			totalAthletes = workoutsArray.length;
			$scope.totalLaps = workoutsArray[0].laps;
			$scope.lap_distance = workoutsArray[0].lap_distance;
			$scope.lap_metric = workoutsArray[0].lap_metric;
			$scope.discipline = workoutsArray[0].discipline;
			lapDistConv = convertDist($scope.lap_distance);
			makeMetricAbrv($scope.lap_metric);
			$scope.discIcon = DisplayFactory.getDiscIcon($scope.discipline);
			setPaceMetric($scope.discipline);
			$scope.description = workoutsArray[0].description;

			athletesArray = WorkoutFactory.createAthletesArray(workouts);
			$scope.displayName = athletesArray[currentAthlete].name;
			$scope.calcTimes = calcTimes($scope.totalLaps, athletesArray[currentAthlete].lapTimes);
			const timesArray = formatTimes(athletesArray[currentAthlete].lapTimes);
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
			const lapPaceObj = calcLapPace(lapSecondsArray[i - 1]);
			newObj.lapPaceMain = lapPaceObj.lapPaceMain;
			newObj.lapPaceDec = lapPaceObj.lapPaceDec;
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
		$scope.displayTimes = makeDisplayArray($scope.totalLaps, timesArray, athletesArray[currentAthlete].lapTimes);
		$scope.calcTimes = calcTimes($scope.totalLaps, athletesArray[currentAthlete].lapTimes);
	}

	const calcTimes = (laps, array) => {
		const totalTime = array.reduce((a, b) => a + b);
		const totalDist = laps * $scope.lap_distance;
		const avgTime = totalTime / laps;
		const formatArray = formatTimes([totalTime, avgTime])
		const calcObj = {};
		const totalTimeSplit = formatArray[0].split('.');
		calcObj.totalDist = totalDist;
		calcObj.totalTime = totalTimeSplit[0];
		calcObj.totalTimeMs = totalTimeSplit[1];

		const avgTimeSplit = formatArray[1].split('.');
		calcObj.avgTime = avgTimeSplit[0];
		calcObj.avgTimeMs = avgTimeSplit[1];

		const newSumPace = calcSumPace(totalTime, totalDist);
		calcObj.sumPaceMain = newSumPace.sumPaceMain;
		calcObj.sumPaceDec = newSumPace.sumPaceDec;

		return calcObj;
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
			case 'km':
				$scope.metricAbrv = 'km';
				break;
		}
	}

	const setPaceMetric = (discipline) => {
		switch (discipline) {
			case 'swim':
				$scope.paceMetricLabel = '/100y';
				break;
			case 'bike':
				$scope.paceMetricLabel = 'mph';
				break;
			case 'run':
				$scope.paceMetricLabel = 'mile';
				break;
		}
	}

	const calcLapPace = (lapTime) => {
		let pace;
		let newPace = {};
		switch ($scope.discipline) {
			case 'swim':
				pace = TimeFormatFactory.fromMs(lapTime * 100 / lapDistConv);
				break;
			case 'bike':
				pace = (lapDistConv / lapTime * 3600000).toFixed(1);
				break;
			case 'run':
				pace = TimeFormatFactory.fromMs(lapTime / lapDistConv);
				break;
		}
		newPace.lapPaceMain = pace.split('.')[0];
		newPace.lapPaceDec = pace.split('.')[1];
		return newPace;
	}

	const calcSumPace = (totalTime, totalDist) => {
		let pace;
		let paceSum = {};
		const totalDistConv = convertDist(totalDist);
		switch ($scope.discipline) {
			case 'swim':
				pace = TimeFormatFactory.fromMs(totalTime * 100 / totalDistConv);
				break;
			case 'bike':
				pace = (totalDistConv / totalTime * 3600000).toFixed(1);
				break;
			case 'run':
				pace = TimeFormatFactory.fromMs(totalTime / totalDistConv);
				break;
		}
		paceSum.sumPaceMain = pace.split('.')[0];
		paceSum.sumPaceDec = pace.split('.')[1];
		return paceSum;
	}

	const convertDist = (dist) => {
		let distConv;
		switch ($scope.discipline) {
			case 'swim':
				switch ($scope.lap_metric) {
					case 'mile':
						distConv = dist * 1760;
						break;
					case 'meter':
						distConv = dist * 1.0936;
						break;
					case 'km':
						distConv = dist * 1093.61;
						break;
					default:
						distConv = dist;
				}
				break;
			default:
				switch ($scope.lap_metric) {
					case 'yard':
						distConv = dist / 1760;
						break;
					case 'meter':
						distConv = dist / 1609.34;
						break;
					case 'km':
						distConv = dist / 1.6093;
						break;
					default:
						distConv = dist;
				}
				break;
		}
		return distConv;
	}

});
