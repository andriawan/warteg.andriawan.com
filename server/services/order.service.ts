import { DB } from "@server/utils/DB";
import { MyException, zeroPad } from "@server/utils/helpers";
import { LogFile } from "@server/utils/logfile";

export class OrderService{

  static async Create( data : ICreate ){
    try{
      const getValidItem = ( selectedID:number ) => data.data.detailValid.find( val => val.id === selectedID )
      await DB.transaction(async function( trx ){
        // LogFile(data)
        let totalPrice = 0
        
        const orderItems: DB.MapOrderItem[] = []
        data.data.detail.forEach(val =>{
          const _getValidItem = getValidItem(val.item_id)
          const orderItem = {
            amount: val.amount ,
            item_id: val.item_id ,
            order_id: 0,
            price: _getValidItem?.price || 0,
          }

          totalPrice += ( orderItem.price * orderItem.amount )

          orderItems.push(orderItem)
        })
        
        data.total_price = totalPrice
        const insertedOrder = await trx('transactions.orders').insert(data) .returning('id')
        orderItems.forEach(val =>{
          val.order_id = insertedOrder[0].id
        })

        await trx('mappings.transactions_orders___items').insert(orderItems)
  
      }).catch(LogFile.throwBack)

      return true

    }catch(error){
      throw new MyException(`Failed saving order , please contact administrator` , 400 )
    }
  }

  static async PrepareOrderID(){
    const currentDate = new Date()
    const prefixOrderId = `${zeroPad(currentDate.getFullYear(),4)}${zeroPad(currentDate.getMonth()+1,2)}${zeroPad(currentDate.getDate(),2)}`
    const orderID = await DB.raw(`SELECT getCode('${prefixOrderId}')`).then( result => result?.rows?.[0] ).catch( LogFile )

    // console.log(orderID)
    return <string | undefined> orderID?.getcode
  }

  static async GetValidItemsDetail( items: { item_id:number , amount: number}[] ){
    const _IDS = items.map(val => val.item_id )
    return await DB('items').select('price','id','name').whereIn('id',_IDS)
  }

  static async GetList({ limit = 27}){
    const query = DB('transactions.orders as a')
                        .leftJoin('files as b','b.id','a.photo_id')
                        .select([
                          'a.code','a.data','a.total_price',
                          'b.file_path','b.file_name'
                        ])
          query.orderBy('a.id','DESC')
          query.limit( limit )
    return await query.catch(LogFile)
  }

}

interface ICreate extends Omit<DB.TransactionOrder , 'id' | 'updated_at' | 'created_at' >{
  data:{ 
    detail: OrderDataDetail[],
    detailValid: Pick<DB.Item, "id" | "price" | "name">[] ,
  },
}

export type OrderDataDetail = {
  item_id: number,
  amount: number,
}