"use strict";

const app = angular.module("TeamTimerApp", ["ngRoute", "ngMaterial", "ngStorage"])
	.config($routeProvider => {

	$routeProvider
		.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'loginCtrl'
		})
	 .when('/admin', {
			templateUrl: 'partials/admin.html',
			controller: 'adminCtrl'
		})
		.when('/coach', {
			templateUrl: 'partials/coach.html',
			controller: 'coachCtrl'
		})
		.when('/workoutsetup', {
			templateUrl: 'partials/workoutSetup.html',
			controller: 'workoutSetupCtrl'
		})
		.when('/selectathletes', {
			templateUrl: 'partials/athletesSelect.html',
			controller: 'athletesSelectCtrl'
		})
		.when('/workoutselect', {
			templateUrl: 'partials/workoutSelect.html',
			controller: 'workoutSelectCtrl'
		})
		.when('/workoutview/:date', {
			templateUrl: 'partials/workoutView.html',
			controller: 'workoutViewCtrl'
		})
		.when('/analysis/:coachId', {
			templateUrl: 'partials/analysis.html',
			controller: 'analysisCtrl'
		})
		.when('/timer', {
			templateUrl: 'partials/timer.html',
			controller: 'timerCtrl'
		})
		.otherwise('/login', {
		})

});
