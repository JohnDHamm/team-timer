module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('Teams', table => {
  	table.increments() //creates an incrementing id as primary key
  	table.string('team_name').unique()
  })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTable('Teams')
};
