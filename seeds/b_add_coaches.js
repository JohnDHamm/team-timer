'use strict'

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('Coaches').del()
		.then(function () {
			return Promise.all([
				// Inserts seed entries
				knex('Coaches')
					.insert({
						id: 1,
						first_name: 'Jennifer',
						last_name: 'Gentry',
						user_name: 'Coach Jen',
						password: 'password1',
						team_id: 1
					}),
				knex('Coaches')
					.insert({
						id: 2,
				    first_name: 'Jeff',
				    last_name: 'Reilly',
				    user_name: 'Coach Jeff',
				    password: 'password2',
				    team_id: 1,
					}),
				knex('Coaches')
					.insert({
						id: 3,
						first_name: 'Bob',
						last_name: 'Smith',
						user_name: 'Coach Bobby',
						password: 'password3',
						team_id: 2
					})
			]);
		});
};
