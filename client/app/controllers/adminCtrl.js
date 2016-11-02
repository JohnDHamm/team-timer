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
		const newAthlete = {
			first_name: $scope.newAthlete_first_name,
			last_name: $scope.newAthlete_last_name,
			display_name: $scope.newAthlete_display_name,
			age: $scope.newAthlete_age,
			avg_pace: $scope.newAthlete_avg_pace,
			group_id: $scope.group_id
		};
		console.log("newAthlete", newAthlete);
		DbFactory.addAthlete(newAthlete)
			.then((data) => {
				console.log("data", data);
				reloadAthletes();
			})
	}

	const reloadAthletes = () => {
		DbFactory.getAthletesByTeam($scope.team_id)
			.then((athletes) => {
				$scope.athletes = athletes;
			$scope.newAthlete_first_name = "";
			$scope.newAthlete_last_name = "";
			$scope.newAthlete_display_name = "";
			$scope.newAthlete_age = "";
			$scope.newAthlete_avg_pace = "";
			$scope.group_id = "";
			})
	}

});
