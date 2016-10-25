'use strict'

const Workout = require('../models/Workout')

module.exports.seed = (knex, Promise) => {

  new Workout({
    description: '5 x 1mi race pace',
    date: '171200500',
    coach_id: 1,
    laps: 5,
    laps_distance: 1,
    laps_metric: 'mile',
    athlete_id: 1,
    data: '[510000, 520000, 515000, 505000, 500000]'
  }).save()


}

