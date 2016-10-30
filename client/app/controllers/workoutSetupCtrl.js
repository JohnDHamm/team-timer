"use strict";

app.controller("workoutSetupCtrl", function($scope, WorkoutFactory, UserFactory, DbFactory, $location){

	UserFactory.setCurrentCoach();
	const currentCoach = UserFactory.getCurrentCoach();
	console.log("currentCoach", currentCoach);
	// const currentCoach = {id: 2, team_id: 1, first_name: "Jeff"};
	$scope.coach = currentCoach.first_name;

	DbFactory.getGroupsByTeam(currentCoach.team_id)
		.then((groupsArray) => {
			$scope.groups = groupsArray;
		})




	$scope.saveWorkoutParams = () => {
		let setupObj = {
			group_id: $scope.group_id,
			description: $scope.description,
			discipline: $scope.discipline,
			laps: $scope.laps,
			lap_distance: $scope.lap_distance,
			lap_metric: $scope.lap_metric,
			coach_id: currentCoach.id
		};
		console.log("setupObj", setupObj);

		WorkoutFactory.setCurrentWorkoutParams(setupObj);
		//go to timer page
		$location.path("/timer");
	};







});
