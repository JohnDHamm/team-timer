"use strict";

app.factory("WorkoutFactory", function($q) {

	const currentWorkoutParams = {};
	let selectedAthletes = [];

	const setCurrentWorkoutParams = (setupObj) => {
		currentWorkoutParams.date = Date.now().toFixed();
		currentWorkoutParams.description = setupObj.description;
		currentWorkoutParams.discipline = setupObj.discipline;
		currentWorkoutParams.coach_id = setupObj.coach_id;
		currentWorkoutParams.laps = setupObj.laps;
		currentWorkoutParams.lap_distance = setupObj.lap_distance;
		currentWorkoutParams.lap_metric = setupObj.lap_metric;
	}

	const getCurrentWorkoutParams = () => currentWorkoutParams;

	const setSelectedAthletes = (athleteArray) => {
		selectedAthletes = athleteArray;
	}

	const getSelectedAthletes = () => selectedAthletes;


	return { setCurrentWorkoutParams, getCurrentWorkoutParams, setSelectedAthletes, getSelectedAthletes };


});
