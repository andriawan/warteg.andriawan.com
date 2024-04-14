import { DB } from "@server/utils/DB";
import { LogFile } from "@server/utils/logfile";

export class ItemsService{

  static async getList(){
    let items = await DB('items')
                      .select('id','name','price','description','is_delete','image_url','created_by','updated_by','created_by','updated_by')
                      .orderByRaw( DB.raw('RANDOM()') )
                      .catch( LogFile )

    return items ? items : undefined
  }

}