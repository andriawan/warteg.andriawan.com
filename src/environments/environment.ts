
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
}

environment.appKey = `${environment.USERDATA_KEY}:${environment.appVersion}`

environment.USERDATA_KEY += `_${environment.appVersion}`