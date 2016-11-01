"use strict";

app.controller("coachCtrl", function($scope, UserFactory){

	const currentCoach = UserFactory.getCurrentCoach();
	$scope.coach = currentCoach.first_name;

});
