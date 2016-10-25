'use strict'

const Team = require('../models/Team')

module.exports.seed = (knex, Promise) => {

  new Team({
    team_name: 'AERO Triathlon Club'
  }).save()

  new Team({
    team_name: 'test team 1'
  }).save()

  new Team({
    team_name: 'test team 2'
  }).save()

}
