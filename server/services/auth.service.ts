import { DB } from "@server/utils/DB"
import { Password } from "@server/utils/hash"
import { LogFile } from "@server/utils/logfile"

export class AuthService {

  static async Login( data: { username:string, password:string }) : Promise< DB.User | undefined >{

    const checkData = await DB('users').where('email' , data.username ).first()

    if( !checkData || !Password.comparePassword( checkData.password || '' , data.password ) )
      return undefined
    
    return checkData
  }

  static async CreateAuthSession( data: DB.LogSession ){
    return await DB('logs.session').insert(data)
  }

  static async isLoggedIn( cookie: string ): Promise<boolean>{
    const checkData = await DB('logs.session').select('user_id','api_key').where('api_key' , cookie ).first()
    if(!checkData)return false

    return typeof checkData.user_id !== 'undefined'
  }

  static async Userinfo( cookie: string ){
    const currentUser = await DB('users as a').select([
                          'a.id','a.first_name as name','a.email','a.username','a.is_active'
                        ])
                        .leftJoin('logs.session as b','b.user_id','a.id')
                        .where('b.api_key', cookie ).first().catch( LogFile.throwBack )
    if(currentUser){
      currentUser.role = 'ADMIN' // ADMIN | CASHIER
    }
    return currentUser

  }
}