'use strict'

const Athlete = require('../models/Athlete')

module.exports.seed = (knex, Promise) => {

  new Athlete({
    first_name: 'Makenna',
    last_name: 'Reillyy',
    display_name: 'Makenna',
    age: 12,
    group_id: 1,
    avg_pace: '8:30'
  }).save()


}
