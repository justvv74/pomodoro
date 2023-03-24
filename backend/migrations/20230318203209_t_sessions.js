/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('t_sessions', (table) => {
    table.increments('id');
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('t_users.id');
    table.string('session_id').notNullable().unique();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('t_sessions');
};
