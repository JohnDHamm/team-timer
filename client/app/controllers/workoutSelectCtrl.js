"use strict";

app.controller("workoutSelectCtrl", function($scope, UserFactory, DbFactory){

	const currentCoach = UserFactory.getCurrentCoach();
	$scope.coach = currentCoach.first_name;

	DbFactory.getWorkoutsByCoach(currentCoach.coach_id)
		.then((workouts) => {
			console.log("workouts", workouts);
			$scope.workouts = workouts;
			filterWorkouts(workouts);
		})


	const filterWorkouts = (workouts) => {
		const allDates = [];
		for (let i = 0; i < workouts.length; i++) {
			allDates.push(workouts[i].date)
		}
		console.log("allDates", allDates);
		const filteredDates = allDates.filter (function (value, index, array) {
		    return array.indexOf (value) == index;
		});



		for (let i = 0; i < workouts.length; i++) {
			for (let j = 0; j < filteredDates.length; j++) {

			}
		}


		console.log("filteredDates", filteredDates);
		return filteredDates;
	};



});
