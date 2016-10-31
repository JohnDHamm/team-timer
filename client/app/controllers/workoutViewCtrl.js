"use strict";

app.controller("workoutViewCtrl", function($scope, $routeParams, DbFactory){

	const date = $routeParams.date;
	console.log("date", date);

	DbFactory.getWorkoutsByDate(date)
		.then((workout) => {
			console.log("workout: ", workout);
		})
});
