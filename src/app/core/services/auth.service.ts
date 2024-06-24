import { Inject, Injectable, Optional } from '@angular/core';
import { environment } from '@environments/environment';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable, catchError, forkJoin, of, switchMap, tap } from 'rxjs';
import { Api, MyAssets, handleError } from '../utils/helpers';
import { ENDPOINTS } from '@environments/endpoints';
import { REQUEST, Request } from '../utils/helpers.server';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private readonly currentUserSubject: BehaviorSubject<UserType> = new BehaviorSubject<UserType>({
    userInfo:{},
    loginData:{},
  }) ;

  get currentUser$(){
    return this.currentUserSubject.asObservable()
  }

  get currentUser(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUser(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private storage: StorageMap,
    @Optional() @Inject(REQUEST) private readonly request: Request | null
  ) {}

  readonly TOKEN: string =  environment.appKey;
  readonly ROLE: string = 'role';

  private isStorageLoaded = false

  get isLoaded(){
    return this.isStorageLoaded
  }

  saveAuthPersistent$( authData: UserType ){
    return this.storage.set(this.TOKEN, authData).pipe(
      tap(()=> {
        this.currentUserSubject.next(authData)
      })
    )
  }

  clientAuthData$() {
    if(this.isStorageLoaded){
      return of(this.currentUser)
    }

    return this.storage.get(this.TOKEN)
    .pipe(
      switchMap( authData =>{
        this.isStorageLoaded = true
        if(authData){
          this.currentUserSubject.next( <UserType> authData)
          //============================ check invalid session
          let _authData = <UserType> authData
          let expiredDate = new Date(_authData.loginData.expiredAt || '2000-01-01' ) , now = new Date()
          if( now > expiredDate ){
            return this.getAuthInfo$().pipe(
              catchError( error => {
                MyAssets().isLoaded().then(()=>{
                  handleError(error)
                }).catch(console.error)

                console.error(error)
                return this.logout$()
              })
            )
          }
          //============================ 
          return of(_authData)
          
        }
          
        return of(undefined)
      }),
    ) as unknown as Observable<UserType | undefined >
  }

  logout$() {
    return forkJoin([
      Api().delete( ENDPOINTS.auth.main ) ,
      this.storage.delete(this.TOKEN).pipe(
        tap(()=>{
          this.currentUser = {
            userInfo:{},
            loginData:{},
          }
        })
      ),
    ]).pipe( switchMap( result => of(undefined)) )
  }

  private getAuthInfo$( headers?: HttpHeaders ){
    return Api().get<My.Object>( ENDPOINTS.auth.info , { headers }).pipe(
      tap( response =>{
        if(response?.data){
          this.currentUser = {
            ...this.currentUser ,
            userInfo: response.data
          }
        }
      })
    )
  }

  serverAuthData$(){
    if( !this.request?.headers ){
      return of(<My.Object>{})
    }
    
    let headers = new HttpHeaders()
    for(let k in this.request.headers ){
      headers = headers.set( k , this.request.headers[k] || '' )
    }

    // console.log(headers)

    return this.getAuthInfo$(headers)
  }
}


type UserType = { 
  userInfo: My.Object , 
  loginData: My.Object ,
  authToken?: string
} & My.Object

// const userJsonSchema = {
//   type:'object',
//   properties:{
//     userInfo: { type: 'object' ,properties:{} },
//     loginData: { type: 'object' ,properties:{} },
//     authToken: { type: 'string' }
//   },

//   required:[ 'userInfo' , 'loginData' ],
// } satisfies JSONSchema