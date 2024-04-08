import { HttpClient } from "@angular/common/http";
import { inject } from "../modules/shared.module";
import { PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { AssetsService } from "@client/core/services/assets.service";

export const Api = () => inject(HttpClient)

export const isServerSide = () => {
  const platformId = inject(PLATFORM_ID)

  return isPlatformServer(platformId)
}

export const isClientSide = () => {
  const platformId = inject(PLATFORM_ID)

  return isPlatformBrowser(platformId)
}

export const delayClient = <T=any>( timer:number , params ?:any ) => new Promise<T>((resolve) =>{
  setTimeout( () => resolve(params) , timer )
})

export const loadJS = async ( url: string | string[] ) => {
  if(isClientSide()){
    let _urls = url instanceof Array ? url : [ url ]

    await Promise.all(_urls.map(val => loadJS.loader(val) )) 
    
    loadJS.setLibs()
  }
  
}

loadJS.loader = ( url: string ) => new Promise((resolve , reject)=>{

  if(isClientSide()){
    let script = document.createElement("script");
    script.defer = true ;
    script.type = "text/javascript";
    script.src = url;
    script.onload = function(){
      resolve('ok')
    }
    script.onerror = function () { reject(); };
    
    const assetPlace = <HTMLHeadElement> document.querySelector('body');
    assetPlace.prepend(script);
    // (document.querySelector("head") as HTMLHeadElement).appendChild(script);
  }
  
})

loadJS.setLibs = ()=>{
  loadJS.libs.swal = (window as any).Swal
  loadJS.libs.moment = (window as any).moment

  loadJS.clear()
}

loadJS.clear = () =>{
  if(isClientSide()){
    (window as any).SweetAlert = undefined;
    (window as any).sweetAlert = undefined;
    (window as any).Sweetalert2 = undefined;
    (window as any).Swal = undefined;
    (window as any).swal = undefined;
    (window as any).moment = undefined;
  }
  
}
loadJS.libs = {} as any

export const clientLoading = {
  show: function(){

    if(isClientSide())
      return loadJS.libs.swal.fire({
        title: "Please wait!",
        allowOutsideClick:false,
        didOpen: function() {
          loadJS.libs.swal.showLoading()
        }
      })
  },
  close:function(){
    loadJS.libs.swal?.close()
  }
}

export const MyAssets = () => inject(AssetsService)

export const Notif = () => (window as any).toastr

Notif.readMessage = function( data:any) : string[]{
  let message: string[]=[]
    try{
      if(typeof data === 'string')return [data]
      if( data?.error ){
        if( Array.isArray(data?.error?.errors) && data?.error?.errors?.length > 0 ){
          data.error.errors.forEach((val:any)=>{
            if(typeof val === 'string'){
              message.push(val)
            }
          })
        }else if( data.error?.toString() === '[object Object]' ){
          if( data.error?.errors?.toString() === '[object Object]' ){
            for(let k in data.error?.errors ){
              let val = data.error.errors[k]?.[0] || 'Unknown Error Message'
              message.push(`${k} : ${val}`)
            }

          }else if(data.error?.message){
            let val = data.error
            message.push(`${val.message}`)
          }
        }
        
      }else if(data?.message){
        message.push(data?.message)
      }else{
        message.push('Unknown Error Message')
      }
    }catch(error){
      message.push(`${error}`)
    }

    console.log(message)

    return message
}

export const handleError = function( data:any , options = undefined ){
  // console.error(data)
  // let msg = typeof data === 'string' ? data : ( data?.responseJSON?.message || data?.response?.data?.message || data?.statusText || data?.toString() || 'Unknown Message, message cant be translated' )
  Notif.readMessage(data).forEach( msg => Notif().error( msg , 'WARNING' , options ) )
  // Notif().error( msg , 'WARNING' , options )
}