'use strict';

exports.seed = function(knex, Promise) {
	return knex('Athletes').del()
		.then(function () {
			return Promise.all([
				//add AERO athletes
				knex('Athletes')
					.insert({
						id: 1,
						first_name: 'Makenna',
						last_name: 'Reilly',
						display_name: 'Makenna',
						age: 12,
						group_id: 1,
						run_pace: 471000
					}),
				knex('Athletes')
					.insert({
						id: 2,
						first_name: 'Lucy',
						last_name: 'Rutherford',
						display_name: 'Lucy',
						age: 12,
						group_id: 1,
						run_pace: 450000
					}),
				knex('Athletes')
					.insert({
						id: 3,
						first_name: 'Trinity',
						last_name: 'Waters',
						display_name: 'Trinity',
						age: 11,
						group_id: 1,
						run_pace: 540000
					}),
				knex('Athletes')
					.insert({
						id: 4,
						first_name: 'Wellington',
						last_name: 'McKinney',
						display_name: 'Wellington',
						age: 12,
						group_id: 1,
						run_pace: 475000
					}),
				knex('Athletes')
					.insert({
						id: 5,
						first_name: 'Maya',
						last_name: 'Reilly',
						display_name: 'Maya',
						age: 10,
						group_id: 1,
						run_pace: 502000
					}),
				knex('Athletes')
					.insert({
						id: 6,
						first_name: 'Devin',
						last_name: 'Reilly',
						display_name: 'Devin',
						age: 9,
						group_id: 2,
						run_pace: 572000
					}),
				knex('Athletes')
					.insert({
						id: 7,
						first_name: 'Gus',
						last_name: 'McGowan',
						display_name: 'Gus',
						age: 13,
						group_id: 2,
						run_pace: 497000
					}),
				knex('Athletes')
					.insert({
						id: 8,
						first_name: 'Clara',
						last_name: 'Early',
						display_name: 'Clara',
						age: 12,
						group_id: 1,
						run_pace: 486000
					}),
				knex('Athletes')
					.insert({
						id: 9,
						first_name: 'Seamus',
						last_name: 'Havron',
						display_name: 'Seamus',
						age: 8,
						group_id: 3,
						run_pace: 620000
					}),
				knex('Athletes')
					.insert({
						id: 10,
						first_name: 'Emily',
						last_name: 'Butler',
						display_name: 'Emily Micah',
						age: 6,
						group_id: 3,
						run_pace: 695000
					}),
				knex('Athletes')
					.insert({
						id: 11,
						first_name: 'Miles',
						last_name: 'Butler',
						display_name: 'Miles B',
						age: 12,
						group_id: 1,
						run_pace: 503000
					}),
				knex('Athletes')
					.insert({
						id: 12,
						first_name: 'Ruth',
						last_name: 'Giblin',
						display_name: 'Ruth',
						age: 13,
						group_id: 1,
						run_pace: 563000
					}),
				knex('Athletes')
					.insert({
						id: 13,
						first_name: 'Darby',
						last_name: 'Mooney',
						display_name: 'Darby',
						age: 9,
						group_id: 2,
						run_pace: 585000
					}),
				knex('Athletes')
					.insert({
						id: 14,
						first_name: 'Searcy',
						last_name: 'Mooney',
						display_name: 'Searcy',
						age: 10,
						group_id: 2,
						run_pace: 570000
					}),
				knex('Athletes')
					.insert({
						id: 15,
						first_name: 'Jackson',
						last_name: 'Lee',
						display_name: 'Jackson',
						age: 13,
						group_id: 2,
						run_pace: 620000
					}),
				knex('Athletes')
					.insert({
						id: 16,
						first_name: 'Ryan',
						last_name: 'Lee',
						display_name: 'Ryan',
						age: 11,
						group_id: 2,
						run_pace: 595000
					}),

				// add SBR athletes
				knex('Athletes')
					.insert({
						id: 17,
						first_name: 'Bobby',
						last_name: 'Smith',
						display_name: 'Junior',
						age: 11,
						group_id: 4,
						run_pace: 492000
					}),
				knex('Athletes')
					.insert({
						id: 18,
						first_name: 'William',
						last_name: 'Jones',
						display_name: 'Jonesy',
						age: 12,
						group_id: 4,
						run_pace: 497000
					}),
				knex('Athletes')
					.insert({
						id: 19,
						first_name: 'Bobby',
						last_name: 'Ford',
						display_name: 'Bobby F.',
						age: 10,
						group_id: 4,
						run_pace: 545000
					})


			]);
		});
};
