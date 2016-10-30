"use strict";

app.factory("WorkoutFactory", function($q) {

	const currentWorkoutParams = {}

	const setCurrentWorkoutParams = (setupObj) => {
		currentWorkoutParams.date = Date.now().toFixed();
		currentWorkoutParams.description = "testing set/get workout params";
		currentWorkoutParams.discipline = "run";
		currentWorkoutParams.coach_id = 1;
		currentWorkoutParams.group_id = 2;
		currentWorkoutParams.laps = 3;
		currentWorkoutParams.lap_distance = .25;
		currentWorkoutParams.lap_metric = 'mile';
	}




	const getCurrentWorkoutParams = () => currentWorkoutParams;


	return { setCurrentWorkoutParams, getCurrentWorkoutParams};

});
