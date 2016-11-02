"use strict";

app.controller("adminCtrl", function($scope, $routeParams, $location, UserFactory, DbFactory){

	const team_id = 1;

	Promise.resolve()
		.then(() => UserFactory.getCurrentCoach())
		.then((coach) => {
			const currentCoach = coach;
			// const team_id = currentCoach.team_id;
			$scope.team_id = team_id;
			// $scope.team_id = currentCoach.team_id;
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


	$scope.addGroup = () => {
		const newGroup = {
			group_name: $scope.newGroup_name,
			description: $scope.newGroup_desc,
			team_id: $scope.team_id
		};
		console.log("newGroup", newGroup);
		DbFactory.addGroup(newGroup)
			.then(() => {
				reloadGroups();
			})
	}

	const reloadGroups = () => {
		DbFactory.getGroupsByTeam($scope.team_id)
			.then((groups) => {
				$scope.groups = groups;
				// $scope.$apply();
				$scope.newGroup_desc = "";
				$scope.newGroup_name = "";
			})
	}

	$scope.addAthlete = () => {
		// const newGroup = {
		// 	group_name: $scope.newGroup_name,
		// 	description: $scope.newGroup_desc,
		// 	team_id: $scope.team_id
		// };
		// console.log("newGroup", newGroup);
		// DbFactory.addGroup(newGroup)
		// 	.then(() => {
		// 		reloadGroups();
		// 	})
	}

	const reloadAthletes = () => {
		// DbFactory.getGroupsByTeam($scope.team_id)
		// 	.then((groups) => {
		// 		$scope.groups = groups;
		// 		// $scope.$apply();
		// 		$scope.newGroup_desc = "";
		// 		$scope.newGroup_name = "";
		// 	})
	}

});
