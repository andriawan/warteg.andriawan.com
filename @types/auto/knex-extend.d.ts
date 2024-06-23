import { Knex } from 'knex'

declare module 'knex/types/tables' {      
  interface Tables {
    'logs.session': DB.LogSession;
    users: DB.User;
    items: DB.Item;
    
    users_composite: Knex.CompositeTableType<
    DB.RawData,
      Pick<DB.RawData, 'url'> & Partial<Pick<DB.RawData, 'created_at' | 'updated_at'>>,
      Partial<Omit<DB.RawData, 'id'>>
    >;
  }
  
}

