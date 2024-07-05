import { ApiResponse, MyException, Yup, delayServer } from '@server/utils/helpers';
import { getServerRouters } from '@server/utils/server.router';
import { generateCookie, middlewareRequireCookie } from '../middlewares/require-cookie';
import { OrderService } from '@server/services/order.service';
import { environment } from '@environments/environment';
import { SessionService } from '@server/services/session.service';
import { LogFile } from '@server/utils/logfile';
import { FileService } from '@server/services/file.service';


const router = getServerRouters()

router.patch('', async function( req , res ){
  const response = ApiResponse<any>({ data: {} , code: 200 })
  try{
    const dataRequest = req.body.items || []
    const validationRules = {
      item_id: Yup.number().required() ,
      amount: Yup.number().required().min(1) ,
    }
    const validation = Yup.array().of(
      Yup.object().shape(validationRules)
    ).min(1).max(77)

    const validationResult = await validation.validate(dataRequest).catch( LogFile.throwBack )
    if(!validationResult)
      throw new MyException('Order Items Not Found' , 400 )

    const cookieValue = req.cookies[environment.cookieName] || ''
    const currentSession = await SessionService.getUserByKey(cookieValue)
    if( !currentSession || !currentSession.data.activeTransactionOrderID )
      throw new MyException('Order ID Not Found' , 400 )

    const validItems = await OrderService.GetValidItemsDetail(validationResult)
    if( validItems.length !== validationResult.length )
      throw new MyException('Order Items doesnt match, please reload the page' , 400 )
    
    const codeOrderID = currentSession.data.activeTransactionOrderID
    currentSession.data.activeTransactionOrderID = undefined
    await currentSession.SaveData()

    const generateQRcode = await FileService.CreateQrCode(
      `${ process.env.APP_BASE_URL }/display/order/${codeOrderID}` , 
      `${codeOrderID}.png`
    )

    const __createOrder = await OrderService.Create({
      code: codeOrderID ,
      data:{ 
        detail: validationResult || [],
        detailValid: validItems ,
      },
      photo_id: generateQRcode.id || 0 ,
      total_price: 0 ,
      user_id: currentSession.userID ,
    })
    
    if(!__createOrder)
      throw new MyException('An Error occurred , we apologize for the inconvenience',500)
    
    response.data = {
      qrcode_url: `${generateQRcode.file_path}/${generateQRcode.file_name}`,
      code: codeOrderID ,
    }

  }catch(error){
    response.code = 400
    response.message = `${error}`
    if( error instanceof MyException ){
      response.code = error.statusCode
    }
  }
  
  res.status(response.code).json(response)
})

/**
 * prepare-order-transaction / start-transaction
*/
router.post('', middlewareRequireCookie , async function( req , res ){
  const response = ApiResponse<any>({ data: [] , code: 200 })
  try{
    const cookieValue = req.cookies[environment.cookieName] || ''
    if( !cookieValue )
      throw new MyException('Failed generate Order ID' , 400 )

    const currentSession = await SessionService.getUserByKey(cookieValue)

    let orderID:string|undefined // await OrderService.PrepareOrderID()
    
    
    if(currentSession){
      if(!currentSession.data.activeTransactionOrderID){
        orderID = await OrderService.PrepareOrderID()
        currentSession.data.activeTransactionOrderID = orderID

        await currentSession.SaveData()
      }
      
    }else{
      const newCookie = generateCookie( environment.cookieName , res )
      orderID = await OrderService.PrepareOrderID()

      await SessionService.Create({
        user_id: null ,
        api_key: newCookie.value ,
        expired_at: newCookie.expiredAt ,
        extra_data: {
          activeTransactionOrderID: orderID ,
        },
      })
    }

    // response.data = await ItemsService.getList()

  }catch(error){
    response.code = 400
    response.message = `${error}`
    if( error instanceof MyException ){
      response.code = error.statusCode
    }
  }
  await delayServer(3000)
  res.status(response.code).json(response)
})

router.get('/:orderID', async function( req , res ){
  const response = ApiResponse<any>({ data: {} , code: 200 })
  try{

    response.data = {
      check: req.params.orderID
    }
    
  }catch(error){
    response.code = 400
    response.message = `${error}`
    if( error instanceof MyException ){
      response.code = error.statusCode
    }
  }

  res.status(response.code).json(response)
})

router.get('', async function( req , res ){
  const response = ApiResponse<any>({ data: [] , code: 200 })
  try{

    response.data = await OrderService.GetList({})
    if(!response.data)
      throw new MyException('An Error Occurred , we are sorry for the inconvenience')
    
  }catch(error){
    response.code = 400
    response.message = `${error}`
    if( error instanceof MyException ){
      response.code = error.statusCode
    }
  }

  res.status(response.code).json(response)
})

export default router