'use strict'

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('Workouts').del()
		.then(function () {
			return Promise.all([
				// Inserts seed entries
				knex('Workouts')
					.insert({
						id: 1,
						description: '5 x 1mi race pace',
						date: '171200500',
						coach_id: 1,
						laps: 5,
						lap_distance: 1,
						lap_metric: 'mile',
						athlete_id: 1,
						data: '[510000, 520000, 515000, 505000, 500000]'
					}),
			]);
		});
};
