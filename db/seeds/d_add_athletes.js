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
						avg_pace: '8:30'
					}),
				knex('Athletes')
					.insert({
						id: 2,
						first_name: 'Lucy',
						last_name: 'Rutherford',
						display_name: 'Lucy',
						age: 12,
						group_id: 1,
						avg_pace: '8:15'
					}),
				knex('Athletes')
					.insert({
						id: 3,
						first_name: 'Troy',
						last_name: 'Fields',
						display_name: 'Troy',
						age: 11,
						group_id: 1,
						avg_pace: '8:35'
					}),
				knex('Athletes')
					.insert({
						id: 4,
						first_name: 'Wellington',
						last_name: 'McKinney',
						display_name: 'Wellington',
						age: 12,
						group_id: 1,
						avg_pace: '8:32'
					}),
				knex('Athletes')
					.insert({
						id: 5,
						first_name: 'Maya',
						last_name: 'Reilly',
						display_name: 'Maya',
						age: 10,
						group_id: 2,
						avg_pace: '9:05'
					}),
				knex('Athletes')
					.insert({
						id: 6,
						first_name: 'Devin',
						last_name: 'Reilly',
						display_name: 'Devin',
						age: 9,
						group_id: 2,
						avg_pace: '9:26'
					}),
				knex('Athletes')
					.insert({
						id: 7,
						first_name: 'Gus',
						last_name: 'McGowan',
						display_name: 'Gus',
						age: 14,
						group_id: 2,
						avg_pace: '8:54'
					}),
				knex('Athletes')
					.insert({
						id: 8,
						first_name: 'Clara',
						last_name: 'Early',
						display_name: 'Clara',
						age: 12,
						group_id: 2,
						avg_pace: '8:46'
					}),
				knex('Athletes')
					.insert({
						id: 9,
						first_name: 'Seamus',
						last_name: 'Havron',
						display_name: 'Seamus',
						age: 8,
						group_id: 3,
						avg_pace: '10:20'
					}),
				knex('Athletes')
					.insert({
						id: 10,
						first_name: 'Emily',
						last_name: 'Butler',
						display_name: 'Emily Micah',
						age: 6,
						group_id: 3,
						avg_pace: '11:45'
					}),

				// add SBR athletes
				knex('Athletes')
					.insert({
						id: 11,
						first_name: 'Bobby',
						last_name: 'Smith',
						display_name: 'Junior',
						age: 11,
						group_id: 4,
						avg_pace: '8:12'
					}),
				knex('Athletes')
					.insert({
						id: 12,
						first_name: 'William',
						last_name: 'Jones',
						display_name: 'Jonesy',
						age: 12,
						group_id: 4,
						avg_pace: '8:17'
					}),
				knex('Athletes')
					.insert({
						id: 13,
						first_name: 'Bobby',
						last_name: 'Ford',
						display_name: 'Bobby F.',
						age: 10,
						group_id: 4,
						avg_pace: '8:41'
					})
			]);
		});
};
