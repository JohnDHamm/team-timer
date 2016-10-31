"use strict";

app.controller("timerCtrl", function($q, $scope, DbFactory, WorkoutFactory){

	const workoutParams = WorkoutFactory.getCurrentWorkoutParams();

	const totalLapsReadout = document.getElementById('totalLaps');

	//get athletes from specified group - DbFactory
	$scope.athleteArray = []
	$scope.timerOn = false;

	DbFactory
		.getAthletesByGroup(workoutParams.group_id)
		.then((data) => {
			createAthleteArray(data)
		})

	const createAthleteArray = (athletesFromDb) => {
		for (let i = 0; i < athletesFromDb.length; i++) {
			const newObj = athletesFromDb[i];
			newObj.index = i;
			newObj.lapTimesArray = [0];
			newObj.readout =  '00:00.00';
			newObj.lap =  0;
			newObj.elapsed = 0;
			newObj.lastLapTime = '00:00.00';

			$scope.athleteArray.push(newObj)
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
			workoutsArray.forEach(workout => {
				DbFactory.saveWorkout(JSON.stringify(workout))
					.then((id) => {
						console.log("id", id);
					});
			})
	}

	const clearAll = () => {
		for (let i = 0; i < $scope.athleteArray.length; i++) {
			$scope.athleteArray[i].lapTimesArray = [0];
			$scope.athleteArray[i].readout =  '00:00.00';
			$scope.athleteArray[i].lap =  0;
			$scope.athleteArray[i].elapsed = 0;
			$scope.athleteArray[i].lastLapTime = '00:00.00';
		}
		totalLapsReadout.textContent = 0;
		mainReadout.textContent = '00:00.00';
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
			.then((something) => console.log("done!"))
	}

	$scope.cancel = function() {
		clearInterval(interval);
		interval = null;
		$scope.timerOn = false;
		clearAll();
	}

	$scope.recordLap = function(index) {
		const thisAthlete = $scope.athleteArray[index];
		thisAthlete.lap ++;
		const nowLap = Date.now();
		const elapsedTime = nowLap - lapStart;
		thisAthlete.elapsed = elapsedTime;
		thisAthlete.lapTimesArray.push(elapsedTime);
		thisAthlete.lastLapTime = timeFormatter(elapsedTime - thisAthlete.lapTimesArray[thisAthlete.lap - 1]);
		checkTotalLaps();
	}

	function update() {
		const timePassed = delta();
		time += timePassed;
		const formattedTime = timeFormatter(time);
		mainReadout.textContent = formattedTime;
		$scope.$apply(function() {
			for (let i = 0; i < $scope.athleteArray.length; i++) {
				const newTime = time - $scope.athleteArray[i].elapsed;
				$scope.athleteArray[i].readout = timeFormatter(newTime);
			}
		});
	}

	function delta() {
		const now = Date.now();
		const timePassed = now - offset;
		offset = now;
		return timePassed;
	}

	function timeFormatter(timeInMilliseconds) {
		let time = new Date(timeInMilliseconds);
		let minutes = time.getMinutes().toString();
		let seconds = time.getSeconds().toString();
		let milliseconds = Math.round((time.getMilliseconds() / 10)).toString().slice(0,2);
		if (minutes.length < 2) {
			minutes = '0' + minutes;
		}
		if (seconds.length < 2) {
			seconds = '0' + seconds;
		}
		while (milliseconds.length < 2) {
			milliseconds = '0' + milliseconds;
		}
		return minutes + ':' + seconds + '.' + milliseconds;
	}

});
