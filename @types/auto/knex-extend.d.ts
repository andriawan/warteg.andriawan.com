import { Knex } from 'knex'

declare module 'knex/types/tables' {      
  interface Tables {
    'logs.session': DB.LogSession;
    'transactions.orders': DB.TransactionOrder;
    'mappings.transactions_orders___items': DB.MapOrderItem;
    users: DB.User;
    items: DB.Item;
    files: DB.File;
    
    users_composite: Knex.CompositeTableType<
    DB.RawData,
      Pick<DB.RawData, 'url'> & Partial<Pick<DB.RawData, 'created_at' | 'updated_at'>>,
      Partial<Omit<DB.RawData, 'id'>>
    >;
  }
  
}

