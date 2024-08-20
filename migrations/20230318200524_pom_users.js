/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    return knex.schema.hasTable('pom_users').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('pom_users', (table) => {
                table.increments('id');
                table.string('username', 255).notNullable().unique();
                table.string('password', 255).notNullable();
            });
        }
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('pom_users');
};
