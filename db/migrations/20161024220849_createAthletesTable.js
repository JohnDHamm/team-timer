module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('Athletes', table => {
  	table.increments() //creates an incrementing id as primary key
  	table.string('first_name')
  	table.string('last_name')
  	table.string('display_name').unique()
  	table.integer('age')
  	table.integer('avg_pace')
  	table.integer('group_id').references('Groups.id')
  })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTable('Athletes')
};
