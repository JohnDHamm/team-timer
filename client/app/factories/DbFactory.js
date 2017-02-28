"use strict";

app.factory("DbFactory", function($q, $http) {

	const getAllCoaches = () =>
		$q((resolve, reject) =>
			$http
				.get(`/api/getAllCoaches`)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	const addCoach = coachObj =>
		$q((resolve, reject) =>
			$http
				.post(`/api/addCoach`, coachObj)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	const getCoach = coach_id =>
		$q((resolve, reject) =>
			$http
				.get(`/api/getCoach/${coach_id}`)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	const getTeams = () =>
		$q((resolve, reject) =>
			$http
				.get(`/api/getTeams`)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	const getTeamName = team_id =>
		$q((resolve, reject) =>
			$http
				.get(`/api/getTeamName/${team_id}`)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	const addTeam = teamObj =>
		$q((resolve, reject) =>
			$http
				.post(`/api/addTeam`, teamObj)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	const getGroupsByTeam = team_id =>
		$q((resolve, reject) =>
			$http
				.get(`/api/getGroups/${team_id}`)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	const addGroup = groupObj =>
		$q((resolve, reject) =>
			$http
				.post(`/api/addGroup`, groupObj)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	const saveEditedGroup = groupObj =>
		$q((resolve, reject) =>
			$http
				.put(`/api/editGroup/${groupObj.id}`, groupObj)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	const getAthletesByGroup = group_id =>
		$q((resolve, reject) =>
			$http
				.get(`/api/getAthletes/Group/${group_id}`)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	const getAthletesByTeam = team_id =>
		$q((resolve, reject) =>
			$http
				.get(`/api/getAthletes/Team/${team_id}`)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	const addAthlete = athleteObj =>
		$q((resolve, reject) =>
			$http
				.post(`/api/addAthlete`, athleteObj)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	const saveWorkout = workoutObj =>
		$q((resolve, reject) =>
			$http
				.post(`/api/saveWorkout`, workoutObj)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	const getWorkoutsByDate = date =>
		$q((resolve, reject) =>
			$http
				.get(`/api/getWorkouts/Date/${date}`)
				.then(({data}) => data ? resolve(data) : reject(null))
		)

	const getWorkoutsByCoach = coach_id =>
		$q((resolve, reject) =>
			$http
				.get(`/api/getWorkouts/Coach/${coach_id}`)
				.then(({data}) => data ? resolve(data) : reject(null))
		)


	return { getAllCoaches, getCoach, addCoach, getTeams, getTeamName, addTeam, getGroupsByTeam, addGroup, saveEditedGroup, getAthletesByGroup, getAthletesByTeam, addAthlete,saveWorkout, getWorkoutsByDate, getWorkoutsByCoach }

});
