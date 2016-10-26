module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('Groups', table => {
  	table.increments() //creates an incrementing id as primary key
  	table.string('group_name')
  	table.string('description')
  	table.integer('team_id').references('Teams.id')
  })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTable('Groups')
};
