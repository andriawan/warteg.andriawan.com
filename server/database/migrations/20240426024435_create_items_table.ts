import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('items', function (table) {
        table.increments('id');
        table.string('name', 255).notNullable();
        table.text('description').notNullable();
        table.integer('price').defaultTo(0);
        table.string('category', 27).defaultTo('');
        
        table.tinyint('is_delete', 2).defaultTo(0);
        table.string('image_url', 255).defaultTo('');
        
        table.jsonb('data').notNullable().defaultTo({});

        table.integer('created_by').defaultTo(0)
        table.integer('updated_by').defaultTo(0)
        table.timestamp('updated_at' , { useTz: true } ).defaultTo(knex.fn.now());
        table.timestamp('created_at' , { useTz: true } ).defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema
      .dropTable("items")
}

