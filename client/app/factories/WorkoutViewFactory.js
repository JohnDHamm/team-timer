'use strict';

app.factory("WorkoutViewFactory", function($q) {

	const convertDistance = (dist, discipline, lapMetric) => {
		let distConv;
		switch (discipline) {
			case 'swim':
				switch (lapMetric) {
					case 'mile':
						distConv = dist * 1760;
						break;
					case 'meter':
						distConv = dist * 1.0936;
						break;
					case 'km':
						distConv = dist * 1093.61;
						break;
					default:
						distConv = dist;
				}
				break;
			default:
				switch (lapMetric) {
					case 'yard':
						distConv = dist / 1760;
						break;
					case 'meter':
						distConv = dist / 1609.34;
						break;
					case 'km':
						distConv = dist / 1.6093;
						break;
					default:
						distConv = dist;
				}
				break;
		}
		return distConv;
	}

	const makeMetricAbrv = (metric) => {
		let abbrev;
		switch (metric) {
			case 'mile':
				abbrev = 'mi';
				break;
			case 'meter':
				abbrev = 'm';
				break;
			case 'yard':
				abbrev = 'yd';
				break;
			case 'km':
				abbrev = 'km';
				break;
		}
		return abbrev;
	}

	const setPaceMetric = (discipline) => {
		let paceMetricLabel;
		switch (discipline) {
			case 'swim':
				paceMetricLabel = '/100y';
				break;
			case 'bike':
				paceMetricLabel = 'mph';
				break;
			case 'run':
				paceMetricLabel = 'mile';
				break;
		}
		return paceMetricLabel;
	}

	const createAthletesArray = (workouts) => {
		const athletesArray = [];
		workouts.forEach(workout => {
			let buildObj = {};
			const lapTimesArray = buildLapTimesArray(workout);
			buildObj.lapTimes = lapTimesArray;
			buildObj.name = workout.display_name;
			athletesArray.push(buildObj);
		})
		return athletesArray;
	}

	const buildLapTimesArray = (workout) => {
		const newArray = workout.data.split(",");
		const parsedArray = newArray.map((each) => {
			return parseInt(each);
		})
		return parsedArray;
	}

	return { convertDistance, makeMetricAbrv, setPaceMetric, createAthletesArray };

});
