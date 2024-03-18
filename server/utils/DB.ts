import Knex from 'knex'
import dbConfigs from '@server/database/knexfile'

export const DB = Knex(dbConfigs)

export type DBqueryBuilder = ReturnType<typeof DB>

console.log('DB has started')