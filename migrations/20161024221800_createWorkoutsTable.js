module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('Workouts', table => {
  	table.increments() //creates an incrementing id as primary key
  	table.string('description')
  	table.string('date')
  	table.integer('laps')
  	table.integer('lap_distance')
  	table.string('lap_metric')
  	table.integer('athlete_id').references('Athletes.id')
  	table.integer('coach_id').references('Coaches.id')
  	table.json('data')
  })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTable('Workouts')
};
