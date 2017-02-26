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

	$scope.toggle = function (group, list) {
		var idx = list.indexOf(group);
		if (idx > -1) {
			list.splice(idx, 1);
		}
		else {
			list.push(group);
		}
		console.log("selectedGroups", $scope.selectedGroups);
	};

	$scope.exists = function (group, list) {
		return list.indexOf(group) > -1;
	};

	$scope.selectGroups = () => {
		$scope.groupsSelected = true;

		//loop through selectedGroups, get athletes, add to array
		for (let i = 0; i < $scope.selectedGroups.length; i++) {
			console.log("group id", $scope.selectedGroups[i].id);
			let groupId = $scope.selectedGroups[i].id;

			DbFactory
				.getAthletesByGroup(groupId)
				.then((athletes) => {
					console.log("athletes", athletes);
					athletes.forEach((athlete) => $scope.selectedAthletes.push(athlete));
					$scope.apply;
				})
		}
		console.log("selectedAthletes final", $scope.selectedAthletes);
	}



	//deselectAthlete from array
		//show current list (updated)


	//remove all/reset list?

	//save selected athletes array to WorkoutFactory
		//go to timer

});
