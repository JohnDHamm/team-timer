module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('Athletes', table => {
  	table.increments()
  	table.string('first_name')
  	table.string('last_name')
  	table.string('display_name').unique()
  	table.integer('age')
    table.integer('swim_pace')
    table.integer('bike_pace')
  	table.integer('run_pace')
  	table.integer('group_id').references('Groups.id')
  })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTable('Athletes')
};
