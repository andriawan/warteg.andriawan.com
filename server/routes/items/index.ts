
import data from '@client/sample/items';
import { ApiResponse, delayServer } from '@server/utils/helpers';
import { getServerRouters } from '@server/utils/server.router';

const router = getServerRouters()

router.all('*', async function( req , res){
  const response = ApiResponse<any>({ data: [] , code: 200 })
  try{

    response.data = data

  }catch(error){
    response.code = 400
    response.message = `${error}`
  }
  
  res.status(response.code).json(response)
})

export default router