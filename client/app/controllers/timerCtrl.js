"use strict";

app.controller("timerCtrl", function($q, $scope, $location, DbFactory, WorkoutFactory, TimerFactory){

	const workoutParams = WorkoutFactory.getCurrentWorkoutParams();
	const selectedAthletes = WorkoutFactory.getSelectedAthletes();
	let sortedAthletesArray = [];

	const totalLapsReadout = document.getElementById('totalLaps');

	$scope.athleteArray = [];
	$scope.timerOn = false;

	const sortAthletes = (discipline) => {
		if (discipline === 'bike') {
			sortedAthletesArray = selectedAthletes.sort((a, b) => b.bike_pace - a.bike_pace);
		} else if (discipline === 'run') {
			sortedAthletesArray = selectedAthletes.sort((a, b) => a.run_pace - b.run_pace);
		} else if (discipline === 'swim') {
			sortedAthletesArray = selectedAthletes.sort((a, b) => a.swim_pace - b.swim_pace);
		}
	}

	const createAthleteArray = (sortedAthletesArray) => {
		for (let i = 0; i < sortedAthletesArray.length; i++) {
			const newObj = sortedAthletesArray[i];
			newObj.index = i;
			newObj.lapTimesArray = [0];
			newObj.readout = '0:00';
			newObj.readoutMs = '00';
			newObj.lap =  0;
			newObj.elapsed = 0;
			newObj.lastLapTime = '0:00';
			newObj.lastLapTimeMs = '00';
			newObj.completedLaps = false;
			$scope.athleteArray.push(newObj);
		}
	}

	sortAthletes(workoutParams.discipline);
	createAthleteArray(sortedAthletesArray);

	const checkTotalLaps = () => {
		const currentLaps = [];
		for (let i = 0; i < $scope.athleteArray.length; i++) {
			currentLaps.push($scope.athleteArray[i].lap)
		}
		const lowestLap = currentLaps.sort(( a, b ) => a - b )[0]
		totalLapsReadout.textContent = lowestLap;
		if (lowestLap === workoutParams.laps) {
			stop();
		}
	}

	const createWorkouts = (athleteArray) => {
		var newWorkoutsArray = [];

		for (let i = 0; i < athleteArray.length; i++) {
			var newWorkoutObj = {};
			newWorkoutObj.athlete_id = athleteArray[i].id;
			const trueLapTimeArray = convertLapTimes(athleteArray[i].lapTimesArray);
			newWorkoutObj.data = trueLapTimeArray;
			newWorkoutsArray.push(newWorkoutObj)
		}

		const finalWorkouts = addCommonWorkoutData(newWorkoutsArray)

		return finalWorkouts;
	}

	const convertLapTimes = (array) => {
		const trueArray = []
		for (let i = 0; i < array.length - 1; i++) {
			trueArray.push(array[i + 1] - array[i]);
		}
		return trueArray.join();
	}

	const addCommonWorkoutData = (newWorkoutsArray) => {
		for (var i = 0; i < newWorkoutsArray.length; i++) {
			newWorkoutsArray[i].date = workoutParams.date;
			newWorkoutsArray[i].coach_id = workoutParams.coach_id;
			newWorkoutsArray[i].description = workoutParams.description;
			newWorkoutsArray[i].discipline = workoutParams.discipline;
			newWorkoutsArray[i].laps = workoutParams.laps;
			newWorkoutsArray[i].lap_distance = workoutParams.lap_distance;
			newWorkoutsArray[i].lap_metric = workoutParams.lap_metric;
		}
		return newWorkoutsArray;
	}

	const saveWorkouts = (workoutsArray) => {
		const promiseArray = [];
			workoutsArray.forEach(workout => {
				promiseArray.push(DbFactory.saveWorkout(JSON.stringify(workout)))
			})
		return Promise.all(promiseArray)
	}

	const clearAll = () => {
		for (let i = 0; i < $scope.athleteArray.length; i++) {
			$scope.athleteArray[i].lapTimesArray = [0];
			$scope.athleteArray[i].readout =  '0:00';
			$scope.athleteArray[i].readoutMs =  '00';
			$scope.athleteArray[i].lap =  0;
			$scope.athleteArray[i].elapsed = 0;
			$scope.athleteArray[i].lastLapTime = '0:00';
			$scope.athleteArray[i].lastLapTimeMs = '00';
		}
		totalLapsReadout.textContent = 0;
		mainReadout.textContent = '0:00.';
		mainReadoutMs.textContent = '00';
	}

	//------STOPWATCH----------

	const mainReadout = document.getElementById('mainReadout');
	const mainReadoutMs = document.getElementById('mainReadoutMs');
	let time = 0;
	let interval;
	let offset;
	let lapStart;

	$scope.start = function() {
		$scope.timerOn = true;
		interval = setInterval(update, 10);
		offset = Date.now();
		lapStart = offset;
	}

	const stop = function() {
		clearInterval(interval);
		interval = null;
		Promise.resolve()
			.then(() => createWorkouts($scope.athleteArray))
			.then((finalWorkouts) => saveWorkouts(finalWorkouts))
			.then((data) => {
				$location.path(`/workoutview/${workoutParams.date}`);
				$scope.$apply();
			})
			.catch(console.error)
	}

	$scope.cancel = function() {
		clearInterval(interval);
		interval = null;
		$scope.timerOn = false;
		clearAll();
	}

	$scope.recordLap = function(index) {
		if ($scope.timerOn) {
			const thisAthlete = $scope.athleteArray[index];
			if (thisAthlete.completedLaps === false) {
				thisAthlete.lap ++;
				const nowLap = Date.now();
				const elapsedTime = nowLap - lapStart;
				thisAthlete.elapsed = elapsedTime;
				thisAthlete.lapTimesArray.push(elapsedTime);

				const lastLapTimeFormattedArray = TimerFactory.timeFormatter(elapsedTime - thisAthlete.lapTimesArray[thisAthlete.lap - 1]).split('.');
				thisAthlete.lastLapTime = lastLapTimeFormattedArray[0];
				thisAthlete.lastLapTimeMs = lastLapTimeFormattedArray[1];

				if (thisAthlete.lap === workoutParams.laps) {
					thisAthlete.completedLaps = true;
					thisAthlete.readout = "done";
					thisAthlete.readoutMs = "";
				}
				checkTotalLaps();
			}
		}
	}

	function update() {
		const timePassed = delta();
		time += timePassed;
		const formattedTime = TimerFactory.timeFormatter(time);
		const mainReadoutArray = formattedTime.split('.');
		mainReadout.textContent = mainReadoutArray[0] + '.';
		mainReadoutMs.textContent = mainReadoutArray[1];
		$scope.$apply(function() {
			for (let i = 0; i < $scope.athleteArray.length; i++) {
				const newTime = time - $scope.athleteArray[i].elapsed;
				if ($scope.athleteArray[i].completedLaps === false) {
					const newTimeFormattedArray = TimerFactory.timeFormatter(newTime).split('.');
					$scope.athleteArray[i].readout = newTimeFormattedArray[0];
					$scope.athleteArray[i].readoutMs = newTimeFormattedArray[1];
				}
			}
		});
	}

	function delta() {
		const now = Date.now();
		const timePassed = now - offset;
		offset = now;
		return timePassed;
	}


});
