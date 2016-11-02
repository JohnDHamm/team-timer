"use strict";

app.controller("homeCtrl", function($scope, $location){

	$scope.goToLogin = () => $location.path('/login')

});
