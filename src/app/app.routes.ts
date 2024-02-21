import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: '', component: LandingComponent, title: 'WARTEG MANIA' },
];
