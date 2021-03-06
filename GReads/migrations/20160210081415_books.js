
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table){
    table.increments();
    table.string('title');
    table.string('genre');
    table.text('description');
    table.string('bookImg');
    table.integer('auth_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
