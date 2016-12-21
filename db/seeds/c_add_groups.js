'use strict';

exports.seed = function(knex, Promise) {
	return knex('Groups').del()
		.then(function () {
			return Promise.all([
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
						group_name: 'Yellow',
						description: 'Development Team - ages 9+',
						team_id: 1
					}),
				knex('Groups')
					.insert({
						id: 3,
						group_name: 'Red',
						description: 'Development Team - ages 6-8',
						team_id: 1
					}),
				knex('Groups')
					.insert({
						id: 4,
						group_name: 'All',
						description: 'all athletes',
						team_id: 2
					}),
				knex('Groups')
					.insert({
						id: 5,
						group_name: 'Noobs',
						description: 'membership less than 2 years',
						team_id: 3
					}),
				knex('Groups')
					.insert({
						id: 6,
						group_name: 'Elite',
						description: 'membership over 2 years',
						team_id: 3
					})
			]);
		});
};
