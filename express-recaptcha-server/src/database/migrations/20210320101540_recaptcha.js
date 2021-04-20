
exports.up = function(knex) {
  return knex.schema.createTable('recaptchas', (table) => {
    table.string('uid').primary();
    table.string('device_uid');
    table.foreign('device_uid').references('devices.uid').onDelete('CASCADE').onUpdate('CASCADE');
    table.string('result');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('recaptchas');
};
