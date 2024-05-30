import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('transactions.orders',function(table){
      table.bigIncrements('id')
      table.string('code',17)
      table.jsonb('data').notNullable().defaultTo({});
      table.integer('total_price').defaultTo(0);

      table.integer('user_id').unsigned().nullable();
      table.foreign('user_id').references('users.id')

      table.integer('photo_id').nullable();
      table.foreign('photo_id').references('files.id')

      table.timestamp('updated_at' , { useTz: true } ).defaultTo(knex.fn.now());
      table.timestamp('created_at' , { useTz: true } ).defaultTo(knex.fn.now());

      table.unique('code')
    })

  await knex.schema
    .createTable('mappings.transactions_orders___items',function(table){
      table.bigInteger('order_id');
      table.bigInteger('item_id');
      table.integer('price').defaultTo(0)
      table.integer('amount').notNullable().defaultTo(0);

      table.foreign('order_id').references('id').inTable('transactions.orders');
      table.foreign('item_id').references('items.id');
      
      table.unique(['order_id','item_id'])
    })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
      .dropTable("mappings.transactions_orders___items")
      .dropTable("transactions.orders")
}

