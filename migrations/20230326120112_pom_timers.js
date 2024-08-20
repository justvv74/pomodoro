/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('pom_timers').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('pom_timers', (table) => {
                table.increments('id');
                table.integer('user_id').notNullable();
                table.foreign('user_id').references('pom_users.id');
                table.string('descr').notNullable();
                table.integer('pomidors').notNullable();
                table.integer('current_pomidor_timer').notNullable();
                table.integer('current_pomidor').notNullable();
                table.integer('current_break_timer').notNullable();
                table.integer('current_break').notNullable();
                table.string('current_timer').notNullable();
                table.boolean('timer_complete').notNullable();
            });
        }
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('pom_timers');
};
