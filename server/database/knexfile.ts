// import 'ts-node/register'

import  path from 'path'
import type { Knex } from "knex";
import _knex from "knex";

import dotenv from "dotenv";
import { expand } from "dotenv-expand";

const isMigrationMode = process.argv.includes('--cwd')

const projectRootPath =  path.resolve( process.cwd() , isMigrationMode ? '../../' : '' ) 
const knexPath = isMigrationMode ? process.cwd() : path.resolve( process.cwd() , 'server/database')

expand(dotenv.config({
  path: `${projectRootPath}/.env`
}))

// console.log(projectRootPath)
// console.log(knexPath)
// console.log(process.argv)
// console.log(isMigrationMode)

const database = {
  client: 'postgresql',
  // connection: process.env.DATABASE_URL ,
  connection:{
    host : process.env.DB_HOST ,
    user : process.env.DB_USER ,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME as string | null | undefined ,
    port: process.env.DB_PORT as number | undefined ,
  },
  migrations: {
    directory: path.resolve( knexPath , 'migrations' ),
    tableName: 'knex_migrations',
  },
  seeds: {
    directory:  path.resolve( knexPath , 'seeds' ),
  },
} as Knex.Config

export default database

export const createDatabase = async function(){
  const dbname = process.env.DB_NAME ;
  
  ( database.connection as any).database = undefined ;
  const knex = _knex(database)
  await knex.raw(`CREATE DATABASE ${dbname}`)
}