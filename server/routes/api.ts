import { ApiResponse } from '@server/utils/helpers'
import { Express, getServerRouters } from '@server/utils/server.router'
import cookieParser from 'cookie-parser'

import ServerItemsRoutes from './items'
import ServerAuthRoutes from './auth'
import ServerOrderRoutes from './orders'

const routers = getServerRouters()

/**
 * Simple CORS rule - middleware
*/
routers.use( ( req , res , next )=>{

  const sourceRequest = req.headers.origin

  if( sourceRequest ){
    
    res.setHeader('Access-Control-Allow-Origin', sourceRequest )
    // res.setHeader('Access-Control-Allow-Origin','*')

    if( req.method === 'OPTIONS' ){
      res.setHeader('Access-Control-Allow-Methods','GET,OPTIONS,PATCH,DELETE,POST,PUT')
      res.setHeader('Access-Control-Allow-Headers','*')
      res.status(204).end()
      
      return
    }
    
  }
  
  next()
})

routers.use(cookieParser())

/**
 * Enable parse JSON body on request
*/
routers.use(Express.json())

//Route for auth
routers.use('/auth',ServerAuthRoutes)

//Route forn items
routers.use('/items', ServerItemsRoutes )

//Route forn orders
routers.use('/orders', ServerOrderRoutes )

//Route for failover / placeholder
routers.all('*',function( req , res){
  const response = ApiResponse({ data:[] , code: 404 , status:'error' , message:'Route not Found'})

  res.status(response.code).json(response)
})


export default routers