/**
 * Type ini Bisa digunakan tanpa import
 * 
 * 
 * NOTE: File ini hanya untuk type
*/
declare namespace My{
  
  type Object<T=any> = {
    [key: string]: T
  }
  

  type ForceType<T> = T extends null | undefined ? never : T

  type KnownRoles = 
    'normal_user'
  | 'admin'
  

  type ResponseApi<T=any> ={
    code: ResponseApiCode ,
    data: T ,
    date?: Date ,
    message?: string ,
    status?: 'success' | 'error' ,
    errors?: string[] ,
  }

  type ResponseApiCode = 400 | 403 | 500 | 501 | 503 | 200 | 404 | 401
  // [key in ListTabMenusKey]:ListRoles[]
}