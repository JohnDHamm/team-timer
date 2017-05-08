"use strict";

app.controller("workoutViewCtrl", function($scope, $routeParams, DbFactory, TimeFormatFactory, DisplayFactory, WorkoutViewFactory){

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
			setWorkoutData(workouts);
			setAthleteData(workouts);
		})


	const setWorkoutData = (workouts) => {
		totalAthletes = workouts.length;
		$scope.totalLaps = workouts[0].laps;
		$scope.discipline = workouts[0].discipline;
		$scope.discIcon = DisplayFactory.getDiscIcon($scope.discipline);
		$scope.description = workouts[0].description;
		$scope.lap_metric = workouts[0].lap_metric;
		$scope.metricAbrv = WorkoutViewFactory.makeMetricAbrv($scope.lap_metric);
		$scope.lap_distance = workouts[0].lap_distance;
		lapDistConv = WorkoutViewFactory.convertDistance($scope.lap_distance, $scope.discipline, $scope.lap_metric);
		$scope.paceMetricLabel = WorkoutViewFactory.setPaceMetric($scope.discipline);
	}

	const setAthleteData = (workouts) => {
		athletesArray = WorkoutViewFactory.createAthletesArray(workouts);
		updateDisplay(currentAthlete);
	}

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

	const updateDisplay = (currentAthlete) => {
		$scope.displayName = athletesArray[currentAthlete].name;
		const timesArray = formatTimes(athletesArray[currentAthlete].lapTimes);
		$scope.displayTimes = makeDisplayArray($scope.totalLaps, timesArray, athletesArray[currentAthlete].lapTimes);
		$scope.calcTimes = calcTimes($scope.totalLaps, athletesArray[currentAthlete].lapTimes);
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

	const calcTimes = (laps, array) => {
		const totalTime = array.reduce((a, b) => a + b);
		const totalDist = (laps * $scope.lap_distance).toFixed(2);
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
		const totalDistConv = WorkoutViewFactory.convertDistance(totalDist, $scope.discipline, $scope.lap_metric);
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

});
