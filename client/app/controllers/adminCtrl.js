"use strict";

app.controller("adminCtrl", function($scope, $routeParams, $location, UserFactory, DbFactory, TimerFactory){

	$scope.groups === [];
	$scope.showMsg = false;
	$scope.showEditGroupModal = false;
	$scope.editGroup = {};
	let notEmptyGroup = false;
	$scope.showEditAthleteModal = false;
	$scope.editAthlete = {};

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

	$scope.groupEdit = (id) => {
		$scope.showEditGroupModal = true;
		for (let i = 0; i < $scope.groups.length; i++) {
			if ($scope.groups[i].id === id) {
				$scope.editGroup = $scope.groups[i];
			}
		}
	}

	$scope.saveEditedGroup = () => {
		$scope.showEditGroupModal = false;
		DbFactory.saveEditedGroup($scope.editGroup)
			.then(() => {
				reloadGroups();
			})
	}

	$scope.cancelEditGroup = () => {
		$scope.showEditGroupModal = false;
		reloadGroups();
	}

	$scope.deleteGroup = (id) => {
		// check if group has no athletes
		for (let i = 0; i < $scope.athletes.length; i++) {
			if ($scope.athletes[i].group_id === id) {
				notEmptyGroup = true;
				break;
			}
		}
		if (notEmptyGroup) {
			$scope.msg = "Cannot delete group because at least one athlete belongs to the group!"
			$scope.showMsg = true;
		} else {
			$scope.msg = "";
			$scope.showMsg = false;
			DbFactory.deleteGroup(id)
				.then(() => {
					reloadGroups();
				})
		}
		notEmptyGroup = false;
	}

	$scope.athleteEdit = (id) => {
		console.log("edit athlete id: ", id);
		for (let i = 0; i < $scope.athletes.length; i++) {
			if ($scope.athletes[i].id === id) {
				$scope.editAthlete = $scope.athletes[i];
			}
		}
		$scope.showEditAthleteModal = true;
	}

	$scope.saveEditedAthlete = () => {
		delete $scope.editAthlete.group_name;
		$scope.editAthlete.swim_pace = convertNewPace($scope.editAthlete.swim_pace);
		$scope.editAthlete.run_pace = convertNewPace($scope.editAthlete.run_pace);

		$scope.showEditAthleteModal = false;
		DbFactory.saveEditedAthlete($scope.editAthlete)
			.then(() => {
				reloadAthletes();
			})
	}

	$scope.cancelEditAthlete = () => {
		$scope.showEditAthleteModal = false;
		reloadAthletes();
	}

	$scope.deleteAthlete = (id) => {
		console.log("delete athlete id: ", id);
		//modal: r u sure? deleting an athlete will also delet all of that athlete's past workout data
		//if yes:
			DbFactory.deleteWorkoutsByAthlete(id)
				.then(() => {
					DbFactory.deleteAthlete(id)
						.then(() => {
							reloadAthletes();
						})
				})
	}




});
