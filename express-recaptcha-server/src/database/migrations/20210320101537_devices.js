
exports.up = function(knex) {
  return knex.schema.createTable('devices', (table) => {
    table.string('uid').primary();
    table.string('ip');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('devices');
};
