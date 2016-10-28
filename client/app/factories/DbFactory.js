"use strict";

app.factory("DbFactory", function($q, $http) {

	const getAthletesByGroup = group_id =>
		$q((resolve, reject) =>
			$http
				.get(`/api/getAthletes/Group/${group_id}`)
				.then(({data}) => data ? resolve(data) : reject(null)))

	return { getAthletesByGroup }

});
