"use strict";

app.controller("loginCtrl", function($scope, UserFactory){






	$scope.login = () => {
		const user = {
			email: $scope.email,
			password: $scope.password
		}
		UserFactory.checkUser(user);
	}


});
