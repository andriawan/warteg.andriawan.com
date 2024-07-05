
import { AuthService } from '@server/services/auth.service';
import { SessionService } from '@server/services/session.service';
import { ApiResponse, MyException, Yup, delayServer } from '@server/utils/helpers';
import { LogFile } from '@server/utils/logfile';
import { getServerRouters } from '@server/utils/server.router';
import { middlewareRequireLogin } from '../middlewares/require-login';
import { generateCookie, middlewareRequireCookie } from '../middlewares/require-cookie';
import { environment } from '@environments/environment';

// import dbConfigs from '@server/database/knexfile'

const router = getServerRouters()

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

    const cookieValue = generateCookie(environment.cookieName , res )

    response.data = { ...response.data , token: cookieValue.value , expiredAt: cookieValue.expiredAt }

    await SessionService.Create({
      user_id: Number( authResult.id || 0 ),
      api_key: cookieValue.value ,
      extra_data: {},
      expired_at: cookieValue.expiredAt ,
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

router.get('/info' , middlewareRequireLogin , async function( req , res ){
  const response = ApiResponse({ data: [] , code: 200 })
  try{
    const acceptedCookieValue = req.cookies[environment.cookieName] || ''
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

router.delete('' , middlewareRequireCookie , async function( req , res ){
  const response = ApiResponse({ data: [] , code: 200 })
  try{
    const existCookie = req.cookies[environment.cookieName] || ''
    if(existCookie){
      SessionService.Delete(existCookie)
    }
    generateCookie(environment.cookieName , res )

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