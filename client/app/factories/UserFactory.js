"use strict";

app.factory("UserFactory", function($sessionStorage) {

	const setCurrentCoach = (setupObj) => {
		$sessionStorage.coach_id = setupObj.id;
		$sessionStorage.team_id = setupObj.team_id;
		$sessionStorage.first_name = setupObj.first_name;
	};

	const getCurrentCoach = () => $sessionStorage;

	return { setCurrentCoach, getCurrentCoach };

});
