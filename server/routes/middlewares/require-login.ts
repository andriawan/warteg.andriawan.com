import { environment } from "@environments/environment"
import { SessionService } from "@server/services/session.service"
import { ApiResponse } from "@server/utils/helpers"
import { NextFunction , Request, Response } from "express"

export const middlewareRequireLogin = async function( req: Request , res: Response , next: NextFunction ){
  const acceptedCookieValue = req.cookies[environment.cookieName] || ''
  const response = ApiResponse({ data: [] , code: 401 })
  try{
    const checkLogin = await SessionService.isLoggedIn( acceptedCookieValue )
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