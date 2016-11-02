"use strict";

app.controller("loginCtrl", function($scope, UserFactory, DbFactory, $location){

	$scope.noUser = false;
	$scope.errorMsg = null;
	$scope.user = false;

	$scope.showRegister = false;
	$scope.showSelectTeam = false;
	$scope.showCreateTeam = false;
	$scope.showRegisterForm = false;

	DbFactory.getTeams()
		.then((teams) => {
			$scope.teams = teams;
		})

	$scope.login = () => {
		let regUser = false;
		$scope.noUser = false;
		$scope.errorMsg = null;
		const userObj = {
			email: $scope.email,
			password: $scope.password
		}

		DbFactory.getAllCoaches()
			.then((coachesArray) => {
				coachesArray.forEach((coach) => {
					if (coach.email === userObj.email && coach.password === userObj.password) {
						regUser = true;
						UserFactory.setCurrentCoach(coach);
						$location.path('/coach');
					} else if (coach.email === userObj.email) {
						$scope.errorMsg = "password is incorrect";
						regUser = true;
					}
				})
			})
			.then(() => {
				if (!regUser) {
					$scope.noUser = true;
				}
			})
	}

	$scope.register = () => {

		let userExists = false;
		$scope.user = false;
		const newUserObj = {
			email: $scope.regEmail,
			password: $scope.regPassword,
			first_name: $scope.first_name,
			last_name: $scope.last_name,
			team_id: $scope.team_id
		}
		console.log("newUserObj", newUserObj);

		DbFactory.getAllCoaches()
			.then((coachesArray) => {
				coachesArray.forEach((coach) => {
					if (coach.email === newUserObj.email) {
						userExists = true;
						$scope.user = true;
					}
				})
			})
			.then(() => {
				if (!userExists) {
					DbFactory.addCoach(newUserObj)
						.then((coachId) => DbFactory.getCoach(coachId))
						.then((coach) => {
							UserFactory.setCurrentCoach(coach[0]);
							$location.path('/coach');
						})
				}
			})
	}


	$scope.joinTeam = () => {
		$scope.showSelectTeam = true;
		$scope.showCreateTeam = false;
		$scope.showRegisterForm = false;
	}

	$scope.createTeam = () => {
		$scope.showCreateTeam = true;
		$scope.showSelectTeam = false;
		$scope.showRegisterForm = false;
	}

	$scope.pickTeam = () => {
		$scope.team_id = $scope.teamSelect;
		console.log("team selected", $scope.team_id);
		DbFactory.getTeamName($scope.team_id)
			.then((teamName) => {
				$scope.team_name = teamName[0].team_name;
				$scope.showRegisterForm = true;
				$scope.showSelectTeam = false;
			})
	}

	$scope.addTeam = () => {
		$scope.team_name = $scope.newTeam_name;
		const newTeamObj = { team_name: $scope.newTeam_name};
		DbFactory.addTeam(newTeamObj)
			.then((newTeamId) => {
				$scope.team_id = newTeamId[0];
				DbFactory.getTeams()
					.then((teams) => {
						$scope.teams = teams;
						$scope.showRegisterForm = true;
						$scope.showCreateTeam = false;
					})
			})
	}

});
