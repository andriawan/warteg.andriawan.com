
import { AuthService } from '@server/services/auth.service';
import { DB } from '@server/utils/DB';
import { UUID } from '@server/utils/hash';
import { ApiResponse, MyException, Yup, delayServer } from '@server/utils/helpers';
import { LogFile } from '@server/utils/logfile';
import { getServerRouters } from '@server/utils/server.router';
import { NextFunction, Request, Response } from 'express';

// import dbConfigs from '@server/database/knexfile'

const router = getServerRouters()

export const middlewareCheckLogin = async function( req: Request , res: Response , next: NextFunction ){
  const acceptedCookieValue = req.cookies.myAngularApp || ''
  const response = ApiResponse({ data: [] , code: 401 })
  try{
    const checkLogin = await AuthService.isLoggedIn( acceptedCookieValue )
    if(!checkLogin){
      response.message = 'Unauthorized: Required auth information, please login before continue'
      response.status = 'error'

      res.status(response.code).json(response)
      return
    }
  }catch(error){
    response.message = `${error}`
    response.status = 'error'
    
    res.status(response.code).json(response)
    return
  }
  
  return next()
}

router.post('/sign-in',async function( req , res){
  const response = ApiResponse({ data: {} , code: 200 })

  try{
    const dataRequest = req.body
    const validationRules = {
      username: Yup.string().email().required() ,
      password: Yup.string().max(77).required() ,
    }
    const validation = Yup.object().shape(validationRules)
    const validationResult = await validation.validate(dataRequest).catch( LogFile.throwBack )

    const authResult = await AuthService.Login(validationResult)

    if( !authResult )
      throw new MyException('Invalid Username & Password' , 400 )

    const cookieValue = UUID()
    const expiredAt = new Date()
    expiredAt.setHours( expiredAt.getHours() + 24 )
    // test expired token / session
    // expiredAt.setMinutes( expiredAt.getMinutes() + 5 )
    
    res.cookie('myAngularApp' , cookieValue , { expires: expiredAt , httpOnly:true })

    response.data = { ...response.data , token: cookieValue , expiredAt }

    await AuthService.CreateAuthSession({
      user_id: Number( authResult.id || 0 ),
      api_key: cookieValue ,
      extra_data: {},
      expired_at: expiredAt ,
    })

  }catch(error){
    response.code = 400
    response.message = `${ error }`
    response.status = 'error'

    if( error instanceof MyException ){
      response.code = error.statusCode
    }
  }
  
  await delayServer(3000)

  res.status(response.code).json(response)
})

router.get('/info' , middlewareCheckLogin , async function( req , res ){
  const response = ApiResponse({ data: [] , code: 200 })
  try{
    const acceptedCookieValue = req.cookies.myAngularApp || ''
    response.data = await AuthService.Userinfo( acceptedCookieValue )

  }catch(error){
    response.code = 400
    response.message = `${ error }`
    response.status = 'error'

    if( error instanceof MyException ){
      response.code = error.statusCode
    }
  }

  res.status(response.code).json(response)
})

router.get('/test', async ( req, res) =>{
  const response = ApiResponse({ data: [] , code: 200 })
  await delayServer(3000)
  res.status(response.code).json(response)
})

export default router