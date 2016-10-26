'use strict';

exports.seed = function(knex, Promise) {
  return knex('Teams').del()
    .then(function () {
      return Promise.all([
        knex('Teams')
          .insert({
            id: 1,
            team_name: 'AERO Triathlon Club'
          }),
        knex('Teams')
          .insert({
            id: 2,
            team_name: 'Team SBR'
          }),
        knex('Teams')
          .insert({
            id: 3,
            team_name: 'Nashville Beer Run Club'
          })
      ]);
    });
};
