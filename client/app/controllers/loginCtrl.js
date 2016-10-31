"use strict";

app.controller("loginCtrl", function($scope, UserFactory, DbFactory, $location){


	$scope.noUser = false;
	$scope.errorMsg = null;


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
						console.log("match", coach);
						regUser = true;
						//setCurrentcoach
						UserFactory.setCurrentCoach(coach);
						$location.path('/workoutsetup');
						// console.log("go to coach page");
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


});
