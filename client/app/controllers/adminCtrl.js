"use strict";

app.controller("adminCtrl", function($scope, $routeParams, $location, UserFactory, DbFactory, TimerFactory){

	$scope.groups === [];
	$scope.showMsg = false;

	Promise.resolve()
		.then(() => UserFactory.getCurrentCoach())
		.then((coach) => {
			const currentCoach = coach;
			const team_id = currentCoach.team_id;
			$scope.team_id = currentCoach.team_id;
			$scope.coachName = currentCoach.first_name;

			return Promise.all([DbFactory.getTeamName(team_id), DbFactory.getGroupsByTeam(team_id), DbFactory.getAthletesByTeam(team_id)]);

		})
		.then(([team_name, groups, athletes]) => {
			$scope.teamName = team_name[0].team_name;
			$scope.groups = groups;
			checkForGroup();
			console.log("athletes: ", athletes);
			$scope.athletes = formatPace(athletes);
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
		DbFactory.addGroup(newGroup)
			.then(() => {
				reloadGroups();
			})
	}

	const reloadGroups = () => {
		DbFactory.getGroupsByTeam($scope.team_id)
			.then((groups) => {
				$scope.groups = groups;
				$scope.newGroup_desc = "";
				$scope.newGroup_name = "";
				checkForGroup();
			})
	}

	$scope.addAthlete = () => {
		checkForGroup();

		const newAthlete = {
			first_name: $scope.newAthlete_first_name,
			last_name: $scope.newAthlete_last_name,
			display_name: $scope.newAthlete_display_name,
			age: $scope.newAthlete_age,
			avg_pace: $scope.newAthlete_avg_pace,
			group_id: $scope.group_id
		};
		DbFactory.addAthlete(newAthlete)
			.then((data) => {
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

	const checkForGroup = () => {
		if ($scope.groups[0] === undefined) {
			$scope.msg = "There must be at least one group to save athlete!"
			$scope.showMsg = true;
		} else {
			$scope.msg = null;
			$scope.showMsg = false;
		}
	}

	const formatPace = (athletesArray) => {
		for ( let i = 0; i < athletesArray.length; i++) {
			athletesArray[i].avg_pace = TimerFactory.timeFormatterMMSS(athletesArray[i].avg_pace);
		}
		return athletesArray;
	}

	$scope.editAthlete = (id) => {
		// console.log("edit athlete id: ", id);
	}

	$scope.editGroup = (id) => {
		// console.log("edit group id: ", id);
	}

});
