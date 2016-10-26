"use strict";

const app = angular.module("TeamTimerApp", ["ngRoute"])
	.config($routeProvider => {

	$routeProvider.
		when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'loginCtrl'
		})
	 .when('/admin/:teamId', {
			templateUrl: 'partials/admin.html',
			controller: 'adminCtrl'
		})
		.when('/coach/:coachId', {
			templateUrl: 'partials/coach.html',
			controller: 'coachCtrl'
		})
		.when('/workout/:coachId', {
			templateUrl: 'partials/workout.html',
			controller: 'workoutCtrl'
		})
		.when('/workoutView/:workoutId', {
			templateUrl: 'partials/workoutView.html',
			controller: 'workoutViewCtrl'
		})
		.when('/analysis/:coachId', {
			templateUrl: 'partials/analysis.html',
			controller: 'analysisCtrl'
		})
		.otherwise('/login', {
		})

});
