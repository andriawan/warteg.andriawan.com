import QRcode from 'qrcode'
import fs from 'fs'
import { zeroPad } from '@server/utils/helpers'
import { DB } from '@server/utils/DB'

export class FileService{


  static async CreateQrCode( textToCode: string , filename: string ){
    const folderGenerateQRcode = './uploads'
    const dateRightNow = new Date()

    const pathDate = `/${ zeroPad( dateRightNow.getFullYear() , 4 ) }/${ zeroPad( dateRightNow.getMonth()+1 , 2 ) }`
    const relativePath = `${ folderGenerateQRcode + pathDate }`
    FileService.CreateFolder( relativePath )

    await QRcode.toFile( `${relativePath}/${filename}` , textToCode , {
      width: 500 ,
    })

    const dataFile: ICreate = {
      file_name: filename,
      file_realname: filename,
      file_extension:'',
      file_mime:'.png',
      file_path: relativePath.replace(/^\./,''),
      created_by: 0 ,
    } 

    const file = await FileService.Create(dataFile)
    dataFile.id = file?.[0]?.id

    return dataFile
  }

  static async Create( data:ICreate ){
    return await DB('files').insert(data).returning('id')
  }

  static CreateFolder( logFolderPosition: string ){
    if (!fs.existsSync(logFolderPosition )){
      fs.mkdirSync(logFolderPosition , { recursive: true } );
    }
  }
}

interface ICreate extends Omit<DB.File , 'id' | 'updated_at' | 'created_at' >{
  id?: number;
}