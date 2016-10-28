"use strict";

app.controller("timerCtrl", function($scope, DbFactory){

	const date = Date.now()
	const description = "testing timer db interaction";
	const coach_id = 3;
	const laps = 3;
	const lap_distance = 100;
	const lap_metric = 'meter';
	const workoutObjTemplate = {
		date,
		description,
		coach_id,
		laps,
		lap_distance,
		lap_metric
	}
	console.log("workoutObjTemplate", workoutObjTemplate);



	//get athletes from specified group - DbFactory
		// returns array of objects
	const group_id = 2;

	$scope.athleteArray = []

	DbFactory
		.getAthletesByGroup(group_id)
		.then((data) => {
			// console.log(`group ${group_id}: `, data);
			createAthleteArray(data)
			// console.log("athleteArray", $scope.athleteArray);
		})






	const createAthleteArray = (athletesFromDb) => {
		//arg = array of athlete objects from db
		//loop over athletesFromDb
		for (let i = 0; i < athletesFromDb.length; i++) {
			//create new obj with data and new items for stopwatch
			const newObj = athletesFromDb[i];
			newObj.index = i;
			newObj.lapTimesArray = [0];
			newObj.readout =  '00:00.00';
			newObj.lap =  0;
			newObj.elapsed = 0;
			newObj.lastLapTime = '00:00.00';
			// console.log("newObj", newObj);
			//push new obj to $scope.athleteArray
			$scope.athleteArray.push(newObj)
		}
	}

	const createWorkouts = (athleteArray) => {
		console.log("array after stop", athleteArray);
		//arg = array of athlete objects after timing
		//loop over array
		var newWorkoutsArray = [];

		for (let i = 0; i < athleteArray.length; i++) {
			//create new workout obj to save to db
			var newWorkoutObj = workoutObjTemplate;
			console.log("athleteArray[i].id", athleteArray[i].id);
			newWorkoutObj.athlete_id = athleteArray[i].id;
			newWorkoutObj.data = athleteArray[i].lapTimesArray;
			console.log("newWorkoutObj", newWorkoutObj);
			newWorkoutsArray.push(newWorkoutObj)
			//save to db

		}
		console.log("newWorkoutsArray", newWorkoutsArray);
	}


	//------STOPWATCH----------

	const readout = document.getElementById('readout');
	var time = 0;
	var interval;
	var offset;
	var lapStart;

	$scope.start = function() {
		interval = setInterval(update, 10);
		offset = Date.now();
		lapStart = offset;
	}

	$scope.stop = function() {
		clearInterval(interval);
		interval = null;
		createWorkouts($scope.athleteArray);
	}

	$scope.recordLap = function(index) {
		const thisAthlete = $scope.athleteArray[index];
		thisAthlete.lap += 1;
		var nowLap = Date.now();
		var elapsedTime = nowLap - lapStart;
		thisAthlete.elapsed = elapsedTime;
		thisAthlete.lapTimesArray.push(elapsedTime);
		// console.log("athlete:", thisAthlete.athlete_id);
		// console.log("laps:", thisAthlete.lapTimesArray);
		thisAthlete.lastLapTime = timeFormatter(elapsedTime - thisAthlete.lapTimesArray[thisAthlete.lap - 1]);
		// console.log("lastLapTime", thisAthlete.lastLapTime);
	}

	function update() {
		var timePassed = delta();
		time += timePassed;

		var formattedTime = timeFormatter(time);
		readout.textContent = formattedTime;
		$scope.$apply(function() {
			for (let i = 0; i < $scope.athleteArray.length; i++) {
				var newTime = time - $scope.athleteArray[i].elapsed;
				$scope.athleteArray[i].readout = timeFormatter(newTime);
			}
		});
	}

	function delta() {
		var now = Date.now();
		var timePassed = now - offset;
		offset = now;
		return timePassed;
	}

	function timeFormatter(timeInMilliseconds) {
		var time = new Date(timeInMilliseconds);
		var minutes = time.getMinutes().toString();
		var seconds = time.getSeconds().toString();
		var milliseconds = (time.getMilliseconds() / 10).toFixed().toString();
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
