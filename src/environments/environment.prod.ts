
export const environment = {
  production: true,
  isMockEnabled: false,
  appName: 'Prod : Warteg Mania',
  appVersion: 'v0.1',
  USERDATA_KEY: 'warteg',
  ApiUrlClient: `/api`,
  appKey:'',
  port: 0 ,
  ApiUrlServer: () => {
    return `http://localhost${ environment.port ? `:${environment.port}` : '' }/api`
  },
  cookieName: 'myAngularApp',
}

environment.appKey = `${environment.USERDATA_KEY}:${environment.appVersion}`
// environment.ApiUrlServer += `:${ process.env.PORT || 4000 }/api`
environment.USERDATA_KEY += `_${environment.appVersion}`