/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('pom_timers', (table) => {
    table.increments('id');
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('pom_users.id');
    table.string('descr').notNullable();
    table.integer('pomidors').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('pom_timers');
};
