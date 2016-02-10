
exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', function(table){
    table.increments();
    table.string('authorFirst');
    table.string('authorSecond');
    table.text('authorBio');
    table.string('authorImg');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
};
