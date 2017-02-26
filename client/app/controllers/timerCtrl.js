"use strict";

app.controller("timerCtrl", function($q, $scope, $location, DbFactory, WorkoutFactory, TimerFactory){

	const workoutParams = WorkoutFactory.getCurrentWorkoutParams();

	const totalLapsReadout = document.getElementById('totalLaps');

	//get athletes from selectedAthletes
	$scope.athleteArray = []
	$scope.timerOn = false;

	// DbFactory
	// 	.getAthletesByGroup(workoutParams.group_id)
	// 	.then((data) => {
	// 		createAthleteArray(data)
	// 	})

	//x = WorkoutFactory.getSelectedAthletes()
		// reorder per pace
		// createAthleteArray(x)

	const createAthleteArray = (athletesFromDb) => {
		for (let i = 0; i < athletesFromDb.length; i++) {
			const newObj = athletesFromDb[i];
			newObj.index = i;
			newObj.lapTimesArray = [0];
			newObj.readout = '0:00.00';
			newObj.lap =  0;
			newObj.elapsed = 0;
			newObj.lastLapTime = '0:00.00';
			newObj.completedLaps = false;
			$scope.athleteArray.push(newObj);
		}
	}

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
			//convert elapsed times to true lap times
			const trueLapTimeArray = convertLapTimes(athleteArray[i].lapTimesArray);
			newWorkoutObj.data = trueLapTimeArray;
			newWorkoutsArray.push(newWorkoutObj)
		}
		//add common workout data
		const finalWorkouts = addCommonWorkoutData(newWorkoutsArray)

		return finalWorkouts;
	}

	const convertLapTimes = (array) => {
		//convert to individual lap times from elapsed time data
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
			$scope.athleteArray[i].readout =  '0:00.00';
			$scope.athleteArray[i].lap =  0;
			$scope.athleteArray[i].elapsed = 0;
			$scope.athleteArray[i].lastLapTime = '0:00.00';
		}
		totalLapsReadout.textContent = 0;
		mainReadout.textContent = '0:00.00';
	}

	//------STOPWATCH----------

	const mainReadout = document.getElementById('mainReadout');
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
		const thisAthlete = $scope.athleteArray[index];
		if (thisAthlete.completedLaps === false) {

			thisAthlete.lap ++;
			const nowLap = Date.now();
			const elapsedTime = nowLap - lapStart;
			thisAthlete.elapsed = elapsedTime;
			thisAthlete.lapTimesArray.push(elapsedTime);
			thisAthlete.lastLapTime = TimerFactory.timeFormatter(elapsedTime - thisAthlete.lapTimesArray[thisAthlete.lap - 1]);
			if (thisAthlete.lap === workoutParams.laps) {
				thisAthlete.completedLaps = true;
				thisAthlete.readout = "done";
			}
			checkTotalLaps();
		}
	}

	function update() {
		const timePassed = delta();
		time += timePassed;
		const formattedTime = TimerFactory.timeFormatter(time);
		mainReadout.textContent = formattedTime;
		$scope.$apply(function() {
			for (let i = 0; i < $scope.athleteArray.length; i++) {
				const newTime = time - $scope.athleteArray[i].elapsed;
				if ($scope.athleteArray[i].completedLaps === false) {
					$scope.athleteArray[i].readout = TimerFactory.timeFormatter(newTime);
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
