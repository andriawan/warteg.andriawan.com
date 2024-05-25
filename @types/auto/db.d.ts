declare namespace DB {
  type DateTimeStamp = string | Date
  

  type LogSession = {
    user_id: number | null,
    api_key: string ,
    extra_data: My.Object ,

    expired_at:DateTimeStamp,
    updated_at?: DateTimeStamp,
    created_at?: DateTimeStamp,
  }
  

  type User = {
    id?:number,
    first_name:string,
    last_name:string,
    email?:string | null,
    username?:string | null,
    password?:string | null,
    photo_id?:number | null,
    data?: My.Object,

    is_delete?:number,
    is_active?:number,
    last_login_at?:DateTimeStamp,
    
    updated_by?:number,
    created_by?:number,
    updated_at?: DateTimeStamp,
    created_at?: DateTimeStamp,
  }

  type Item = {
    id: number,
    name: string,
    description: string,
    price: number,
    category: 'FOOD' | 'DRINK',

    is_delete: 0 | 1 ,
    image_url: string ,
    data: My.Object ,
    
    updated_by:number,
    created_by:number,
    updated_at: DateTimeStamp,
    created_at: DateTimeStamp,
  }

  type File = {
    id:number,
    file_path:string,
    file_name:string,
    file_extension:string | null,
    file_realname:string | null,
    file_mime:string | null,
    created_by:number,
    updated_at: DateTimeStamp,
    created_at: DateTimeStamp,
  }

  type TransactionOrder = {
    id: number;
    code: string;
    data: My.Object;

    total_price: number;
    user_id: number | null ;
    photo_id: number | null;
    
    updated_at: DateTimeStamp;
    created_at: DateTimeStamp;
  }

  type MapOrderItem = {
    order_id: number ;
    item_id: number;
    price: number;
    amount: number; 
  }
  
}