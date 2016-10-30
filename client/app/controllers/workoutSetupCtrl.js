"use strict";

app.controller("workoutSetupCtrl", function($scope, WorkoutFactory, DbFactory, $location){



	//use coach id to get groups from team
	// const currentCoach = UserFactory.getCurrentCoach()
	// console.log("currentCoach", currentCoach);
	const currentCoach = {team_id: 1, first_name: "Jeff"};
	$scope.coach = currentCoach.first_name;

	DbFactory.getGroupsByTeam(currentCoach.team_id)
		.then((groupsArray) => {
			console.log("groupsArray", groupsArray);
		})

	//populate groups selection drop down

	//form:
		//group (selection), description, discipline, laps, lap_distance, lap_metric (radio select)




	//on submit: save workout params
	// $scope.saveWorkoutParams = () => {
	// 	let setupObj = {
	// 		userId: userId,
	// 		userName: $scope.userName



	// 	};
	// 	WorkoutFactory.setCurrentWorkoutParams(setupObj)
	// 	//go to timer page
	// 	$location.path("/timer");
	// };







});
