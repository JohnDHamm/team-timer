'use strict'

const Coach = require('../models/Coach')

module.exports.seed = (knex, Promise) => {

  new Coach({
    first_name: 'Jennifer',
    last_name: 'Gentry',
    user_name: 'Coach Jen',
    password: 'password1',
    team_id: 1,
  }).save()

  new Coach({
    first_name: 'Jeff',
    last_name: 'Reilly',
    user_name: 'Coach Jeff',
    password: 'password2',
    team_id: 1,
  }).save()

  new Coach({
    first_name: 'John',
    last_name: 'Hamm',
    user_name: 'Coach John',
    password: 'password3',
    team_id: 1,
  }).save()


}
