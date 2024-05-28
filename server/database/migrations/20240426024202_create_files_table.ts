import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('files', function (table) {
        table.increments('id');
        table.string('file_path', 255).notNullable();
        table.string('file_name', 255).notNullable();
        table.string('file_extension', 27).nullable();
        table.string('file_realname', 255).nullable();
        table.string('file_mime', 255).nullable();
        table.string('file_size', 27).defaultTo(0);

        table.integer('created_by').defaultTo(0)
        table.timestamp('updated_at' , { useTz: true } ).defaultTo(knex.fn.now());
        table.timestamp('created_at' , { useTz: true } ).defaultTo(knex.fn.now());
        
    })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema
      .dropTable("files")
}

