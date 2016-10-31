'use strict';

exports.seed = function(knex, Promise) {
	return knex('Coaches').del()
		.then(function () {
			return Promise.all([
				knex('Coaches')
					.insert({
						id: 1,
						first_name: 'Jennifer',
						last_name: 'Gentry',
						email: 'jen@aero.com',
						password: 'jenpass',
						team_id: 1
					}),
				knex('Coaches')
					.insert({
						id: 2,
				    first_name: 'Jeff',
				    last_name: 'Reilly',
				    email: 'jeff@aero.com',
				    password: 'jeffpass',
				    team_id: 1,
					}),
				knex('Coaches')
					.insert({
						id: 3,
				    first_name: 'John',
				    last_name: 'Hamm',
				    email: 'john@aero.com',
				    password: 'johnpass',
				    team_id: 1,
					}),
				knex('Coaches')
					.insert({
						id: 4,
						first_name: 'Bob',
						last_name: 'Smith',
						email: 'CoachBobby@team.com',
						password: 'password4',
						team_id: 2
					}),
				knex('Coaches')
					.insert({
						id: 5,
						first_name: 'Mike',
						last_name: 'Towns',
						email: 'CoachMike@team.com',
						password: 'password5',
						team_id: 2
					}),
				knex('Coaches')
					.insert({
						id: 6,
						first_name: 'Susan',
						last_name: 'Brown',
						email: 'CoachSue@team.com',
						password: 'password6',
						team_id: 3
					})
			]);
		});
};
