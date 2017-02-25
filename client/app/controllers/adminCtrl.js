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
			swim_pace: convertNewPace($scope.newAthlete_swim_pace),
			bike_pace: $scope.newAthlete_bike_pace,
			run_pace: convertNewPace($scope.newAthlete_run_pace),
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
				$scope.athletes = formatPace(athletes);
				$scope.newAthlete_first_name = "";
				$scope.newAthlete_last_name = "";
				$scope.newAthlete_display_name = "";
				$scope.newAthlete_age = "";
				$scope.newAthlete_swim_pace = "";
				$scope.newAthlete_bike_pace = "";
				$scope.newAthlete_run_pace = "";
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
			athletesArray[i].swim_pace = TimerFactory.timeFormatterMMSS(athletesArray[i].swim_pace);
			athletesArray[i].run_pace = TimerFactory.timeFormatterMMSS(athletesArray[i].run_pace);
		}
		return athletesArray;
	}

	const convertNewPace = (pace) => {
		const paceTimeArray = pace.split(":");
		const min = parseInt(paceTimeArray[0]);
		const sec = parseInt(paceTimeArray[1]);
		const avgPaceMs = Math.trunc((min * 60) + sec) * 1000;
		return avgPaceMs;

	}

	$scope.editAthlete = (id) => {
		// console.log("edit athlete id: ", id);
	}

	$scope.editGroup = (id) => {
		// console.log("edit group id: ", id);
	}

});
