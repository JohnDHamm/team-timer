"use strict";

app.factory("UserFactory", function($q, DbFactory) {

	const checkUser = (userObj) => {
		console.log("userObj", userObj);
		DbFactory.getAllCoaches()
		.then((coaches) => {
			const allCoaches = coaches;
			console.log("allCoaches", allCoaches);
		});

	}




	const currentCoachParams = {};

	const setCurrentCoach = (setupObj) => {
		// currentCoachParams.coach_id = setupObj.id;
		// currentCoachParams.team_id = setupObj.team_id;
		// currentCoachParams.first_name = setupObj.first_name;
		currentCoachParams.coach_id = 2;
		currentCoachParams.team_id = 1;
		currentCoachParams.first_name = "Jeff";

	}

	const getCurrentCoach = () => currentCoachParams;

	return { checkUser, setCurrentCoach, getCurrentCoach};

});
