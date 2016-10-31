"use strict";

app.controller("workoutViewCtrl", function($scope, $routeParams, DbFactory, WorkoutFactory){

	console.log("params", $routeParams);
	const date = $routeParams.date;
	$scope.displayDate = dateFormat(date);
	// console.log("date", $scope.displayDate);

	DbFactory.getWorkoutsByDate(date)
		.then((workouts) => {
			const workoutsArray = workouts;
			console.log("workoutsArray: ", workoutsArray);
			//set header info: total laps, lap_dist, lap_metric, discipline, date, descr?
			$scope.totalLaps = workoutsArray[0].laps;
			$scope.lap_distance = workoutsArray[0].lap_distance;
			$scope.lap_metric = workoutsArray[0].lap_metric;
			$scope.discipline = workoutsArray[0].discipline;
			$scope.description = workoutsArray[0].description;

			const athletesArray = WorkoutFactory.createAthletesArray(workouts);
			console.log("athletesArray", athletesArray);



		})








	function dateFormat (date) {
		console.log("date", date);
		const newDate = new Date(1477447627584)
		console.log("newDate", newDate);
		const formattedDate = newDate;

		return formattedDate;
	}



});
