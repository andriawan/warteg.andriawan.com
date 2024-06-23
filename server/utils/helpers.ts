export const ApiResponse = <T=any>( response: ApiResponseParams<T> ) => <ApiResponseParams<T>> Object.assign({
  version:'1.0',
  datetime: (new Date).toISOString(),
  timestamp: (new Date).getTime(),
  status:'success',
  code: 200 ,
  message: 'OK',
  data: [] ,
  errors:null,
} , response || {} )

type ApiResponseParams<T> = My.ResponseApi<T> & My.Object


export const delayServer = <T=any>( timer:number , params ?:any ) => new Promise<T>((resolve) =>{
  setTimeout( () => resolve(params) , timer )
})

export class MyException extends Error{
  
  constructor(
    public override readonly  message = "Error Message" , 
    public readonly  statusCode: My.ResponseApiCode = 500 ,
  ){super()}
}

export * as Yup from 'yup'