/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('pom_settings').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('pom_settings', (table) => {
                table.increments('id');
                table.integer('user_id').notNullable();
                table.foreign('user_id').references('pom_users.id');
                table.integer('timer_duration').notNullable();
                table.integer('break_duration').notNullable();
                table.integer('big_break_duration').notNullable();
                table.integer('before_big_break').notNullable();
                table.boolean('auto_start').notNullable();
                table.boolean('alerts').notNullable();
                table.string('theme').notNullable();
            });
        }
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('pom_settings');
};
