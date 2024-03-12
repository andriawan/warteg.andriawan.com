import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('logs.session', function (table) {
      table.integer('user_id').unsigned().nullable();
      table.string('api_key',177).notNullable();
      table.jsonb('extra_data').notNullable().defaultTo({});
      table.timestamp('expired_at' , { useTz: true } ).defaultTo(knex.fn.now());
      
      table.timestamp('updated_at' , { useTz: true } ).defaultTo(knex.fn.now());
      table.timestamp('created_at' , { useTz: true } ).defaultTo(knex.fn.now());

      table.foreign('user_id').references('users.id');
      table.unique('api_key');
    })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema
      .dropTable("logs.session")
}