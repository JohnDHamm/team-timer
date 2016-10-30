"use strict";

app.controller("workoutSetupCtrl", function($scope, WorkoutFactory, DbFactory, $location){

	$(document).ready(function() {
    $('select').material_select();
  });

	//use coach id to get groups from team
	// const currentCoach = UserFactory.getCurrentCoach()
	// console.log("currentCoach", currentCoach);
	const currentCoach = {id: 2, team_id: 1, first_name: "Jeff"};
	$scope.coach = currentCoach.first_name;

	DbFactory.getGroupsByTeam(currentCoach.team_id)
		.then((groupsArray) => {
			//populate groups selection drop down
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

		WorkoutFactory.setCurrentWorkoutParams(setupObj);
		//go to timer page
		$location.path("/timer");
	};







});
