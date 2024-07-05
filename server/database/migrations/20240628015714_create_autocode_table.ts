import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('autocode',function(table){
      table.string('code',17)
      table.integer('current_increment')

      table.timestamp('updated_at' , { useTz: true } ).defaultTo(knex.fn.now());
      table.timestamp('created_at' , { useTz: true } ).defaultTo(knex.fn.now());

      table.unique('code')
    })

  await knex.raw(`
    CREATE OR REPLACE FUNCTION getCode ( _code VARCHAR )  
      RETURNS VARCHAR
      LANGUAGE plpgsql
      as
    $$

    DECLARE
      _current_increment integer;
      _max_length_pad integer;
    BEGIN
      _max_length_pad = 7;
      SELECT current_increment INTO _current_increment FROM autocode WHERE code = _code ;

      IF _current_increment IS NOT NULL THEN
          _current_increment = _current_increment + 1;
          UPDATE autocode SET current_increment = _current_increment WHERE code = _code ;
      ELSE
          _current_increment = 1;
          INSERT INTO autocode VALUES( _code , _current_increment );
      END IF;
      
      RETURN  UPPER( CONCAT( _code , LPAD(_current_increment::VARCHAR, _max_length_pad ,\'0\') ) );

    END
    $$
  `)
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
      .dropTable("autocode")
}

