import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw('DROP SCHEMA IF EXISTS logs CASCADE')
  await knex.raw('CREATE SCHEMA logs')

  await knex.raw(`
    CREATE OR REPLACE FUNCTION "reset_sequence" (tablename text, columnname text, sequence_name text) 
    RETURNS "pg_catalog"."void" AS 
    
    $$ 
    DECLARE 
    BEGIN 
    
    EXECUTE 'SELECT setval( ''' || sequence_name  || ''', ' || '(SELECT MAX(' || columnname || ') FROM ' || tablename || ')' || '+1)';
    
    END;  
    
    $$ LANGUAGE 'plpgsql';
  `)
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP SCHEMA IF EXISTS logs CASCADE')
}

