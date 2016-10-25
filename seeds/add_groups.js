'use strict'

const Group = require('../models/Group')

module.exports.seed = (knex, Promise) => {

  new Group({
    group_name: 'HPT',
    description: 'High Performance Team',
    team_id: 1
  }).save()

  new Group({
    group_name: 'Comp',
    description: 'Competitive Team',
    team_id: 1
  }).save()

  new Group({
    group_name: 'Dev',
    description: 'Development Team',
    team_id: 1
  }).save()


}
