"use strict";

app.controller("workoutSelectCtrl", function($scope, UserFactory, DbFactory, TimeFormatFactory, $location, DisplayFactory){

	const currentCoach = UserFactory.getCurrentCoach();
	$scope.coach = currentCoach.first_name;

	DbFactory.getWorkoutsByCoach(currentCoach.coach_id)
		.then((workouts) => {
			$scope.workouts = filterWorkouts(workouts);
		})

	const filterWorkouts = (workouts) => {
		const allDates = [];
		for (let i = 0; i < workouts.length; i++) {
			allDates.push(workouts[i].date)
		}
		const filteredDates = allDates.filter (function (value, index, array) {
		    return array.indexOf (value) == index;
		});

		//loop thru filteredDates
		const filteredWorkouts = [];
		for (let i = 0; i < filteredDates.length; i++) {
			//create new obj
			const newObj = {};
			//loop thru workouts
			for (let j = 0; j < workouts.length; j++) {
				//if date matches, record details to new obj
				if (workouts[j].date === filteredDates[i]) {
					newObj.description = workouts[j].description;
					newObj.discIcon = DisplayFactory.getDiscIcon(workouts[j].discipline);
					// newObj.group_name = workouts[j].group_name;
					newObj.date = workouts[j].date;
					newObj.formattedDate = TimeFormatFactory.dateFormatter(workouts[j].date);
				}
			}
			//push newObj to filteredWorkouts array
			filteredWorkouts.push(newObj);
		}

		return filteredWorkouts;
	};

	$scope.goToWorkout = (workoutDate) => {
		$location.path(`/workoutview/${workoutDate}`)
	}

	$scope.deleteWorkout = (date) => {
		DbFactory.deleteWorkoutsByDate(date)
			.then((num) => {
				removeWorkoutFromArray(date);

			})
	}

	const removeWorkoutFromArray = (date) => {
		for (let i = 0; i < $scope.workouts.length; i++) {
			if ($scope.workouts[i].date == date) {
				$scope.workouts.splice(i, 1);
			}
		}
	}

});
