import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { CustomHttpInterceptor } from './core/interceptors/http.interceptor';
import { SharedModule } from './core/modules/shared.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    
    provideHttpClient( 
      withFetch(),
      withInterceptors([
        CustomHttpInterceptor
      ])
    ),

    importProvidersFrom([
      SharedModule.forRoot()
    ]),
    provideAnimationsAsync(),
  ],
};
