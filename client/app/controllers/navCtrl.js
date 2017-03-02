"use strict";

app.controller("navCtrl", function($scope, $location, UserFactory, $sessionStorage){

	$scope.coachName = $sessionStorage.first_name;

	$scope.logout = function(){
		delete $sessionStorage.coach_id;
		delete $sessionStorage.team_id;
		delete $sessionStorage.first_name;
		$location.path('/login');
	};

});
