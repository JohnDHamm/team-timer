'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Teams').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('Teams').insert({id: 1, team_name: 'AERO Triathlon Club'}),
        knex('Teams').insert({id: 2, team_name: 'test team 1'}),
        knex('Teams').insert({id: 3, team_name: 'test team 2'})
      ]);
    });
};
