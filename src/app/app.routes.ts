import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { DisplayComponent } from './pages/display/display.component';
import { tokenGuard } from './guard/token.guard';
import { loggedInGuard } from './guard/logged-in.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [loggedInGuard],
  },
  { path: '', component: LandingComponent, title: 'WARTEG MANIA' },
  {
    path: 'display',
    component: DisplayComponent,
    title: 'Display',
    canActivate: [tokenGuard],
  },
];
