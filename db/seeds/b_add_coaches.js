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
						user_name: 'CoachJen',
						password: 'password1',
						team_id: 1
					}),
				knex('Coaches')
					.insert({
						id: 2,
				    first_name: 'Jeff',
				    last_name: 'Reilly',
				    user_name: 'CoachJeff',
				    password: 'password2',
				    team_id: 1,
					}),
				knex('Coaches')
					.insert({
						id: 3,
				    first_name: 'John',
				    last_name: 'Hamm',
				    user_name: 'CoachJohn',
				    password: 'password3',
				    team_id: 1,
					}),
				knex('Coaches')
					.insert({
						id: 4,
						first_name: 'Bob',
						last_name: 'Smith',
						user_name: 'CoachBobby',
						password: 'password4',
						team_id: 2
					}),
				knex('Coaches')
					.insert({
						id: 5,
						first_name: 'Mike',
						last_name: 'Towns',
						user_name: 'CoachMike',
						password: 'password5',
						team_id: 2
					}),
				knex('Coaches')
					.insert({
						id: 6,
						first_name: 'Susan',
						last_name: 'Brown',
						user_name: 'CoachSue',
						password: 'password6',
						team_id: 3
					})
			]);
		});
};
