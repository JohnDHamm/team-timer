"use strict";

app.controller("adminCtrl", function($scope, $routeParams, UserFactory, DbFactory){

	Promise.resolve()
		.then(() => UserFactory.getCurrentCoach())
		.then((coach) => {
			const currentCoach = coach;
			const team_id = currentCoach.team_id;
			$scope.coachName = currentCoach.first_name;

			return Promise.all([DbFactory.getTeamName(team_id), DbFactory.getGroupsByTeam(team_id), DbFactory.getAthletesByTeam(team_id)]);

		})
		.then(([team_name, groups, athletes]) => {
			$scope.teamName = team_name[0].team_name;
			$scope.groups = groups;
			console.log("groups", groups);
			$scope.athletes = athletes;
			console.log("athletes", athletes);
		})
		.then(() => {
			$scope.$apply();
		})
		.catch(console.err)

});
