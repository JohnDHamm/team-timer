'use strict'

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('Groups').del()
		.then(function () {
			return Promise.all([
				// Inserts seed entries
				knex('Groups')
					.insert({
						id: 1,
						group_name: 'HPT',
						description: 'High Performance Team',
						team_id: 1
					}),
				knex('Groups')
					.insert({
						id: 2,
						group_name: 'Comp',
						description: 'Competitive Team',
						team_id: 1
					}),
				knex('Groups')
					.insert({
						id: 3,
						group_name: 'Dev',
						description: 'Development Team',
						team_id: 1
					}),
				knex('Groups')
					.insert({
						id: 4,
						group_name: 'All',
						description: 'all athletes',
						team_id: 2
					})
			]);
		});
};
