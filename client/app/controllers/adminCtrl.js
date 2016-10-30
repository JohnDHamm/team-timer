"use strict";

app.controller("adminCtrl", function($scope, $routeParams, UserFactory, DbFactory){

	// const teamId = $routeParams.teamId
	const teamId = UserFactory.getCurrentCoach().team_id;
	console.log("teamId", teamId);

});
