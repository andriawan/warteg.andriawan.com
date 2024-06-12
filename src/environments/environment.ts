
/**
 * This file is used by Server Side ( api ) and Client Side ( angular )
 * Make sure do not import any kind of library that only work on client side or server side
 * 
 * ATTENTION: Do not put any sensitive information here since this file will be bundled in client side as well
 * If you need to set any sensitive key example: secret key , please use .env file
*/
export const environment = {
  production: false,
  isMockEnabled: false,
  appName: 'Dev : Warteg Mania',
  appVersion: 'v0.1',
  USERDATA_KEY: 'warteg',
  ApiUrlClient: `/api`,
  appKey:'',
  port: 4200 ,
  ApiUrlServer: () => {
    return `http://localhost${ environment.port ? `:${environment.port}` : '' }/api`
  },
  cookieName: 'myAngularApp',
}

environment.appKey = `${environment.USERDATA_KEY}:${environment.appVersion}`

environment.USERDATA_KEY += `_${environment.appVersion}`