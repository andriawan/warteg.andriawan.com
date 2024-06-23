import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('users', function (table) {
        table.increments('id');
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255).notNullable();
        table.string('email', 99).nullable();
        table.string('username', 77).nullable();
        table.string('password').nullable();

        // table.integer('photo_id').nullable();
        // table.foreign('photo_id').references('files.id')

        table.jsonb('data').notNullable().defaultTo({});

        table.tinyint('is_delete', 2).notNullable().defaultTo(0);
        table.tinyint('is_active', 2).notNullable().defaultTo(1);
        table.timestamp('last_login_at' , { useTz: true } ).nullable();

        table.integer('created_by').defaultTo(0)
        table.integer('updated_by').defaultTo(0)
        table.timestamp('updated_at' , { useTz: true } ).defaultTo(knex.fn.now());
        table.timestamp('created_at' , { useTz: true } ).defaultTo(knex.fn.now());

        table.unique('email')
        table.unique('username')
    })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema
      .dropTable("users")
}

