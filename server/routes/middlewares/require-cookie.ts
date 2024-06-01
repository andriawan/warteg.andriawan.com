import { environment } from "@environments/environment"
import { Security, UUID } from "@server/utils/hash"
import { ApiResponse } from "@server/utils/helpers"
import { NextFunction , Request, Response } from "express"

export const middlewareRequireCookie = async function( req: Request , res: Response , next: NextFunction ){
  let acceptedCookieValue: string = req.cookies[environment.cookieName] || ''
  const response = ApiResponse({ data: [] , code: 401 })
  try{
    if( !Security.Verify(acceptedCookieValue , 'HeLizCoolZ' ) ){
      acceptedCookieValue = ''
    }

    if(!acceptedCookieValue){
      const newCookie = generateCookie( environment.cookieName , res )
      req.cookies[environment.cookieName] = newCookie.value
    }

  }catch(error){
    response.message = `${error}`
    response.status = 'error'
    
    res.status(response.code).json(response)
    return
  }
  
  return next()
}

export const generateCookie = function( cookieName: string , res: Response ){
  
  const cookieValue = Security.Hash( UUID() , 'HeLizCoolZ' ) 
  const expiredAt = new Date()
  expiredAt.setHours( expiredAt.getHours() + 24 )
  // test expired token / session
  // expiredAt.setMinutes( expiredAt.getMinutes() + 5 )
  
  res.cookie( cookieName  , cookieValue , { expires: expiredAt , httpOnly:true })
  
  return {
    value: cookieValue ,
    expiredAt
  }
}