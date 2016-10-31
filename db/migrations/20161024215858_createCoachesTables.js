module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('Coaches', table => {
  	table.increments() //creates an incrementing id as primary key
  	table.string('first_name')
  	table.string('last_name')
  	table.string('email').unique()
  	table.string('password')
  	table.integer('team_id').references('Teams.id')
  })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTable('Coaches')
};
