import { DB } from "@server/utils/DB"
import { LogFile } from "@server/utils/logfile"

export class SessionService {
  
  constructor(
    public readonly userID: number | null ,
    private readonly apiKey: string ,
    public readonly data: Partial<ISessionData> = {}
  ){}

  private querySelected(){
    const query = DB('logs.session').where('api_key' , this.apiKey )
    if(this.userID)
        query.where('user_id' , this.userID )

    return query
  }

  async SaveData(){
    const query = this.querySelected()
      
    const affected = await query.update({
      extra_data: this.data ,
      updated_at: DB.raw(' NOW() ')
    }).catch( LogFile )

    return affected
  }

  async Delete(){
    const query = this.querySelected()
    return await query.delete().catch( LogFile )
  }

  //====================================================== STATIC ===================================================================

  static async getUserByKey( apiKey: string ){
    const checkData = await DB('logs.session').where('api_key' , apiKey ).first().catch( LogFile )
    if(!checkData) return undefined

    return new SessionService(
      checkData.user_id ,
      apiKey ,
      checkData.extra_data ,
    )
  }

  static async Create( data: ICreate ){
    return await DB('logs.session').insert(data)
  }

  static async isLoggedIn( cookie: string ): Promise<boolean>{
    const checkData = await DB('logs.session').select('user_id','api_key').where('api_key' , cookie ).first()
    if(!checkData)return false

    return typeof checkData.user_id !== 'undefined'
  }

  static async Delete( apiKey: string ){
    return await DB('logs.session').where('api_key' , apiKey ).delete().catch( LogFile )
  }

}

interface ISessionData {
  activeTransactionOrderID: string;
}

interface ICreate extends Omit<DB.LogSession , 'extra_data'>{
  extra_data: Partial<ISessionData> ;
}