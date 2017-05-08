"use strict";

app.controller("timerCtrl", function($q, $scope, $location, DbFactory, WorkoutFactory, TimerFactory, WorkoutViewFactory, TimeFormatFactory){

	const workoutParams = WorkoutFactory.getCurrentWorkoutParams();
	const selectedAthletes = WorkoutFactory.getSelectedAthletes();
	let sortedAthletesArray = [];

	const totalLapsReadout = document.getElementById('totalLaps');

	$scope.athleteArray = [];
	$scope.timerOn = false;

	$scope.paceMetricLabel = WorkoutViewFactory.setPaceMetric(workoutParams.discipline);
	const lapDistConv = WorkoutViewFactory.convertDistance(workoutParams.lap_distance, workoutParams.discipline, workoutParams.lap_metric);


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
			// newObj.lastLapTime = '0:00';
			// newObj.lastLapTimeMs = '00';
			newObj.lastLapPaceMain = '--';
			newObj.lastLapPaceDec = '';

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

	const resetTimer = () => {
		for (let i = 0; i < $scope.athleteArray.length; i++) {
			$scope.athleteArray[i].lapTimesArray = [0];
			$scope.athleteArray[i].readout =  '0:00';
			$scope.athleteArray[i].readoutMs =  '00';
			$scope.athleteArray[i].lap =  0;
			$scope.athleteArray[i].elapsed = 0;
			// $scope.athleteArray[i].lastLapTime = '0:00';
			// $scope.athleteArray[i].lastLapTimeMs = '00';
			$scope.athleteArray[i].lastLapPaceMain = '--';
			$scope.athleteArray[i].lastLapPaceDec = '';

		}
		resetBtnPositions();
		currentAthleteOrder = makeInitialOrderArray($scope.athleteArray);
		time = 0;
		totalLapsReadout.textContent = 0;
		mainReadout.textContent = '0:00.';
		mainReadoutMs.textContent = '00';
	}

	//------STOPWATCH----------

	const mainReadout = document.getElementById('mainReadout');
	const mainReadoutMs = document.getElementById('mainReadoutMs');
	let time = 0, interval, offset, lapStart;

	const makeInitialOrderArray = (athArr) => {
		let orderArray =[];
		for (let i = 0; i < athArr.length; i++) {
			orderArray.push(athArr[i].index);
		}
		return orderArray;
	}

	let currentAthleteOrder = makeInitialOrderArray($scope.athleteArray),
			athleteBtnHeight = 66,
			numAthletes = $scope.athleteArray.length;

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
		resetTimer();
	}

	$scope.recordLap = function(index) {
		if ($scope.timerOn) {
			const thisAthlete = $scope.athleteArray[index];
			// console.log("thisAthlete", thisAthlete);
			if (thisAthlete.completedLaps === false) {
				thisAthlete.lap ++;
				const nowLap = Date.now();
				const elapsedTime = nowLap - lapStart;
				thisAthlete.elapsed = elapsedTime;
				thisAthlete.lapTimesArray.push(elapsedTime);
				// console.log("thisAthlete.lapTimesArray", thisAthlete.lapTimesArray);


				// const lastLapTimeFormattedArray = TimerFactory.timeFormatter(elapsedTime - thisAthlete.lapTimesArray[thisAthlete.lap - 1]).split('.');
				// thisAthlete.lastLapTime = lastLapTimeFormattedArray[0];
				// thisAthlete.lastLapTimeMs = lastLapTimeFormattedArray[1];
				const lastLapTime = elapsedTime - thisAthlete.lapTimesArray[thisAthlete.lap - 1];
				const lastLapPace = calcLapPace(lastLapTime);
				// console.log("lastLapPace", lastLapPace, $scope.paceMetricLabel);
				thisAthlete.lastLapPaceMain = lastLapPace.lapPaceMain + '.';
				thisAthlete.lastLapPaceDec = lastLapPace.lapPaceDec;

				if (thisAthlete.lap > 1) {
					const currentLap = thisAthlete.lap;
					let lapPaceDiff;
					if (workoutParams.discipline === 'bike') {
						const currentPaceObj = calcLapPace(thisAthlete.lapTimesArray[currentLap] - thisAthlete.lapTimesArray[currentLap - 1]);
						const currentPace = parseInt(currentPaceObj.lapPaceMain) + (parseInt(currentPaceObj.lapPaceDec) / 10);
						const prevPaceObj = calcLapPace(thisAthlete.lapTimesArray[currentLap - 1] - thisAthlete.lapTimesArray[currentLap - 2]);
						const prevPace = parseInt(prevPaceObj.lapPaceMain) + (parseInt(prevPaceObj.lapPaceDec) / 10);
						lapPaceDiff = (currentPace - prevPace).toFixed(1);
						console.log("bike paceDiff", lapPaceDiff);
					} else {
						const lapDiffTime = (thisAthlete.lapTimesArray[currentLap] - thisAthlete.lapTimesArray[currentLap - 1]) - (thisAthlete.lapTimesArray[currentLap - 1] - thisAthlete.lapTimesArray[currentLap - 2]);
						// console.log("lapDiffTime", lapDiffTime);
						lapPaceDiff = calcLapPace(lapDiffTime);
						console.log("swim/run PaceDiff", lapPaceDiff);
					}
					thisAthlete.paceDiffMain = lapPaceDiff.lapPaceMain + '.';
					thisAthlete.paceDiffDec = lapPaceDiff.lapPaceDec;
					setPaceDiffColor(thisAthlete.paceDiffMain, thisAthlete.index, workoutParams.discipline);
				}

				if (thisAthlete.lap === workoutParams.laps) {
					thisAthlete.completedLaps = true;
					thisAthlete.readout = "done";
					thisAthlete.readoutMs = "";
				}
				checkTotalLaps();
				animateButtons(index);
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

	const animateButtons = (index) => {
		let currentOrderIndex = currentAthleteOrder.indexOf(index);
		let distanceToBottom = (numAthletes - currentOrderIndex - 1) * athleteBtnHeight;
		let btnsToAnimateUp = makeNextButtonsArray(currentOrderIndex);

		TweenLite.to(`#athleteBtn${index}`, .25, {
			top: `+=${distanceToBottom}px`,
			opacity: 0.4,
			ease: Power2.easeInOut,
			onComplete: function() {
				TweenLite.to(`#athleteBtn${index}`, .25, {
					opacity: 1,
					ease:Power2.easeInOut
					})
				}
		});
		TweenLite.to(btnsToAnimateUp, .25, {
			top: `-=${athleteBtnHeight}`,
			ease:Power2.easeInOut
		});
		updateOrder(index, currentOrderIndex);
	}

	const updateOrder = (index, currentOrderIndex) => {
		currentAthleteOrder.splice(currentOrderIndex, 1);
		currentAthleteOrder.push(index);
	}

	const makeNextButtonsArray = (currentOrderIndex) => {
		let nextArray = [];
		for (let i = currentOrderIndex + 1 ; i < currentAthleteOrder.length; i++) {
			let nextString = `#athleteBtn${currentAthleteOrder[i]}`;
			nextArray.push(nextString);
		}
		return nextArray;
	}

	const resetBtnPositions = () => {
		for (let i = 0; i < $scope.athleteArray.length; i++) {
			let index = currentAthleteOrder[i];
			if (index > i) {
				let topResetDistance = (index - i) * athleteBtnHeight;
				TweenLite.to(`#athleteBtn${index}`, .25, {
					top: `+=${topResetDistance}px`,
					ease: Power2.easeInOut
				});
			} else if (index < i) {
				let topResetDistance = (i - index) * athleteBtnHeight;
				TweenLite.to(`#athleteBtn${index}`, .25, {
					top: `-=${topResetDistance}px`,
					ease: Power2.easeInOut
				});
			}
		}
	}

	const calcLapPace = (lapTime) => {
		let pace;
		let newPace = {};
		switch (workoutParams.discipline) {
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

	const setPaceDiffColor = (diffMain, index, disc) => {
		const paceSpan = document.getElementById(`paceDiffSpan--${index}`);
		console.log("paceSpan", paceSpan);
		console.log("diffMain", diffMain);
		const firstChar = diffMain.charAt(0);
		console.log("firstChar", firstChar);
		switch (disc) {
			case 'bike':
				switch (firstChar) {
					case '-':
						console.log("bike -");
						paceSpan.classList.remove('lapPaceFaster');
						paceSpan.classList.add('lapPaceSlower');
						break;
					default:
						console.log("bike +");
						paceSpan.classList.remove('lapPaceSlower');
						paceSpan.classList.add('lapPaceFaster');
				}
			default:
				switch (firstChar) {
					case '-':
						console.log("diff is -: make green");
						paceSpan.classList.remove('lapPaceSlower');
						paceSpan.classList.add('lapPaceFaster');
						break;
					default:
						console.log("diff is +: make red");
						paceSpan.classList.remove('lapPaceFaster');
						paceSpan.classList.add('lapPaceSlower');
				}
		}
	}

});
