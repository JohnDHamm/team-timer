"use strict";

app.controller("athletesSelectCtrl", function($scope, WorkoutFactory, UserFactory, DbFactory, $location){

	const currentCoach = UserFactory.getCurrentCoach();
	DbFactory.getGroupsByTeam(currentCoach.team_id)
		.then((groupsArray) => {
			$scope.allGroups = groupsArray;
		})

	$scope.groupsSelected = false;
	$scope.selectedGroups = [];
	$scope.selectedAthletes = [];

	$scope.toggle = function (group, selGroupsArray) {
		var idx = selGroupsArray.indexOf(group);
		if (idx > -1) {
			selGroupsArray.splice(idx, 1);
		}
		else {
			selGroupsArray.push(group);
		}
	};

	$scope.selectGroups = () => {
		$scope.groupsSelected = true;

		//loop through selectedGroups, get athletes, add to array
		for (let i = 0; i < $scope.selectedGroups.length; i++) {

			let groupId = $scope.selectedGroups[i].id;

			DbFactory
				.getAthletesByGroup($scope.selectedGroups[i].id)
				.then((athletes) => {
					athletes.forEach((athlete) => $scope.selectedAthletes.push(athlete));
					$scope.apply;
				})
		}
	}


	$scope.deselectAthlete = (athlete, athleteArr) => {
		let index = athleteArr.indexOf(athlete);
		$scope.selectedAthletes.splice(index, 1);
		$scope.apply;
	}


	//remove all/reset list?


	$scope.saveSelectedAthletes = () => {
		console.log("final list", $scope.selectedAthletes);
		WorkoutFactory.setSelectedAthletes($scope.selectedAthletes);
		$location.path("/timer");
	}

});
