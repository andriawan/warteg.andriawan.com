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
  
}