import fs from 'fs'
import util from 'util'

export const LogFile = function( ...args:any[] ){

  sleep(27).then(()=>{
    const dateRightNow = new Date() , dateDetail = {
      year: dateRightNow.getFullYear() ,
      month: dateRightNow.getMonth() + 1 ,
      date: dateRightNow.getDate() ,
    }
    const checkNewDate = `${ zeroPad( dateDetail.year , 4 ) }-${ zeroPad( dateDetail.month , 2 ) }-${ zeroPad( dateDetail.date , 2 ) }`

    if( LogFile.currentDate !== checkNewDate ){
      const folderPath = `./logs`
      LogFile.currentDate = checkNewDate
      LogFile.createFolder(folderPath)
      LogFile.createStreamFileLog( folderPath )
    }
    
    args.forEach(val=>{
      let currentTime = `${zeroPad(dateRightNow.getHours(),2)}:${zeroPad(dateRightNow.getMinutes(),2)}:${zeroPad(dateRightNow.getSeconds(),2)} `
      LogFile._fileLogStream?.write(`${currentTime} `+ util.format(val) + '\n');
    })
  })
  
}

LogFile.throwBack = function<T=any>( ...args:any ){
  LogFile(...args)

  if( args.length > 1 ){
    throw new Error('Data error is array')
  }else if( args?.[0] && !Array.isArray(args?.[0]) ){
    throw args[0]
  }else
    throw new Error( `${args}` )
}

LogFile.currentDate = ''
LogFile._fileLogStream = undefined as fs.WriteStream | undefined

LogFile.createFolder = function( logFolderPosition: string ){
  if (!fs.existsSync(logFolderPosition )){
    fs.mkdirSync(logFolderPosition , { recursive: true } );
  }
}

LogFile.createStreamFileLog = function( logFolderPosition:string ){
  LogFile._fileLogStream = fs.createWriteStream(`${logFolderPosition}/${LogFile.currentDate}-debug.log`, {flags : 'a'})
}

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

const zeroPad = (num:number, stringLength:number) => String(num).padStart(stringLength, '0')