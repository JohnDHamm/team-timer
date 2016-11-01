"use strict";

app.factory("WorkoutFactory", function($q) {

	const currentWorkoutParams = {}

	const setCurrentWorkoutParams = (setupObj) => {
		currentWorkoutParams.date = Date.now().toFixed();
		currentWorkoutParams.description = setupObj.description;
		currentWorkoutParams.discipline = setupObj.discipline;
		currentWorkoutParams.coach_id = setupObj.coach_id;
		currentWorkoutParams.group_id = setupObj.group_id;
		currentWorkoutParams.laps = setupObj.laps;
		currentWorkoutParams.lap_distance = setupObj.lap_distance;
		currentWorkoutParams.lap_metric = setupObj.lap_metric;
	}

	const getCurrentWorkoutParams = () => currentWorkoutParams;


	const createAthletesArray = (workouts) => {
		const athletesArray = [];
		workouts.forEach(workout => {
			let buildObj = {};
			const lapTimesArray = buildLapTimesArray(workout);
			buildObj.lapTimes = lapTimesArray;
			buildObj.name = workout.display_name;
			// console.log("buildObj", buildObj);
			athletesArray.push(buildObj);

		})

		return athletesArray;

	}

	const buildLapTimesArray = (workout) => {
		const newArray = workout.data.split(",");
		const parsedArray = newArray.map((each) => {
			return parseInt(each);
		})
		// console.log("parsedArray", parsedArray);
		return parsedArray;

	}


	return { setCurrentWorkoutParams, getCurrentWorkoutParams, createAthletesArray };


});
