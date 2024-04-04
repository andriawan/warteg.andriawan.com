import { Injectable } from '@angular/core';
import { interval, Subject, takeUntil } from 'rxjs';
import { BehaviorSubject, filter } from 'rxjs';
import { loadJS } from '../utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private readonly currentStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false) ;

  constructor() { }

  set currentStatus(status: boolean) {
    this.currentStatusSubject.next(status);
  }

  get currentStatus() {
    return this.currentStatusSubject.value;
  }

  /**
   * @param timeout default = 30_000
  */
  isLoaded = (timeout: number = 30000) => new Promise<boolean>((resolve,reject)=>{

    if(this.currentStatusSubject.value){
      resolve(this.currentStatusSubject.value)
      return
    }

    const subscriber = this.currentStatusSubject.pipe(
      filter( status => status === true )
    ).subscribe({
      next: resolve ,
      error: reject ,
    })

    setTimeout(()=>{
      if(this.currentStatus)
        resolve(this.currentStatus)
      else
        reject('Asset not Found !!!')

      subscriber.unsubscribe()
    }, timeout )

  })

  isLoaded$ = ()=> {
    return this.currentStatusSubject.pipe(
      filter( status => status === true )
    )
  }

  checkExist = () => new Promise<boolean>((resolve)=>{
    const unsubscribe$ = new Subject<any>()
    const interval$ = interval(501)
    
    interval$.pipe(
      takeUntil(unsubscribe$),
      filter( data => typeof window?.$ !== 'undefined' )
    ).subscribe({
      next: data => {
        // console.log(data)
        resolve(true)
        this.currentStatus = true
        loadJS.setLibs()
        unsubscribe$.next(null)
        unsubscribe$.complete()
      }
    })
  })
}
