"use strict";

app.controller("workoutViewCtrl", function($scope, $routeParams, DbFactory){

	console.log("params", $routeParams);
	const date = $routeParams.date;
	console.log("date", date);

	DbFactory.getWorkoutsByDate(date)
		.then((workout) => {
			console.log("workout: ", workout);
		})
});
