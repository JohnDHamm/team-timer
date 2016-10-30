"use strict";

app.factory("DbFactory", function($q, $http) {

	const getAllCoaches = () =>
		$q((resolve, reject) =>
			$http
				.get(`/api/getAllCoaches`)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	const getGroupsByTeam = team_id =>
		$q((resolve, reject) =>
			$http
				.get(`/api/getGroups/${team_id}`)
				.then(({data}) => data ? resolve(data) : reject(null))
		)




	const getAthletesByGroup = group_id =>
		$q((resolve, reject) =>
			$http
				.get(`/api/getAthletes/Group/${group_id}`)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	const saveWorkout = workoutObj =>
		$q((resolve, reject) =>
			$http
				.post(`/api/saveWorkout`, workoutObj)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	return { getAllCoaches, getGroupsByTeam, getAthletesByGroup, saveWorkout }

});
