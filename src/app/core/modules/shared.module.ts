import { EnvironmentProviders, Injector , NgModule, Provider, ProviderToken } from "@angular/core";
import { environment } from "@environments/environment";
import { DevRequest, REQUEST } from "../utils/helpers.server";
// import { HTTP_INTERCEPTORS } from "@angular/common/http";
// import { CustomHttpInterceptor } from "../interceptors/http.interceptor";

const providers: ( Provider | EnvironmentProviders )[] = [

  // {
  //   provide: HTTP_INTERCEPTORS,
  //   multi: true,
  //   useClass: CustomHttpInterceptor,
  // },
  // {
  //   provide: AuthHTTPService,
  //   useClass: environment.isMockEnabled ? AuthHTTPServiceFake  : AuthHTTPService,
  // },
]

if( !environment.production ){
  providers.push({
    provide: REQUEST,
    useFactory:function(){
      return inject(DevRequest)._context || {}
    },
  })
}

/**
 * Only Shared & Important Provider , Module , Import , Export included HERE
*/
@NgModule({
  declarations: [
  ],
  imports: [
    // CommonModule,
  ],
  exports: [ ],
  providers:[] ,
})
export class SharedModule {
  static injector: Injector;

  constructor(injector: Injector) {
    SharedModule.injector = injector;
  }

  static forRoot(){
    return {
      ngModule: SharedModule,
      providers: providers as ( Provider | EnvironmentProviders )[]
    }
  }

  // static appInitializerProvider() : Provider {
  //   return {
  //     provide: APP_INITIALIZER ,
  //     useFactory: ( authService: AuthService ) => new Promise((resolve,reject)=>{
  //       // const authService = inject(AuthService)

  //       console.log('APP INITIATE')
  
  //     }),
  //     multi: true ,
  //     deps:[AuthService],
  //   }
  // }
}

export const inject = <T>(service: ProviderToken<T>): T => {
  return SharedModule.injector.get(service);
};