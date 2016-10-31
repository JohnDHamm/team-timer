"use strict";

app.factory("UserFactory", function($q, DbFactory) {



	const currentCoachParams = {};

	const setCurrentCoach = (setupObj) => {
		console.log("setupObj", setupObj);
		currentCoachParams.coach_id = setupObj.id;
		currentCoachParams.team_id = setupObj.team_id;
		currentCoachParams.first_name = setupObj.first_name;
	};

	const getCurrentCoach = () => currentCoachParams;

	return { setCurrentCoach, getCurrentCoach};

});
