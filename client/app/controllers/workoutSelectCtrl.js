"use strict";

app.controller("workoutSelectCtrl", function($scope, UserFactory, DbFactory){

	const currentCoach = UserFactory.getCurrentCoach();
	$scope.coach = currentCoach.first_name;

	DbFactory.getWorkoutsByCoach(currentCoach.coach_id)
		.then((workouts) => {
			console.log("workouts", workouts);
			$scope.workouts = workouts;
		})


	const filterWorkouts = (workouts) => {
		let filteredDates = [];
		for (let i = 0; i < workouts.length; i++) {
			let nextDate = workout[i].date;
			for (let j = 0; j < filteredDates.length; j++) {

			}
		}
	};



});
