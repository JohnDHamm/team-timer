'use strict'

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('Athletes').del()
		.then(function () {
			return Promise.all([
				// Inserts seed entries
				knex('Athletes')
					.insert({
						id: 1,
						first_name: 'Makenna',
						last_name: 'Reilly',
						display_name: 'Makenna',
						age: 12,
						group_id: 1,
						avg_pace: '8:30'
					}),
				knex('Athletes')
					.insert({
						id: 2,
						first_name: 'Maya',
						last_name: 'Reilly',
						display_name: 'Maya',
						age: 10,
						group_id: 1,
						avg_pace: '9:05'
					}),
				knex('Athletes')
					.insert({
						id: 3,
						first_name: 'Devin',
						last_name: 'Reilly',
						display_name: 'Devin',
						age: 9,
						group_id: 2,
						avg_pace: '9:26'
					}),
				knex('Athletes')
					.insert({
						id: 4,
						first_name: 'Bobby',
						last_name: 'Smith',
						display_name: 'Junior',
						age: 11,
						group_id: 4,
						avg_pace: '21:12'
					}),

			]);
		});
};
