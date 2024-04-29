import { Routes } from '@angular/router';
// import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
// import { DisplayComponent } from './pages/display/display.component';
import { isLoggedInGuard } from './guard/logged-in.guard';
import { tokenGuard } from './guard/token.guard';

export const routes: Routes = [
  {
    path: 'login',
    // component: LoginComponent,
    loadComponent: () => import('./pages/login/login.component').then( c => c.LoginComponent ),
    title: 'Login',
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'display',
    // component: DisplayComponent,
    loadComponent: () => import('./pages/display/display.component').then( c => c.DisplayComponent ),
    title: 'Display',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/layout/layout.component').then( c => c.LayoutComponent ),
    canActivate:[ tokenGuard ],
    children:[
      { path: '' , loadChildren: ()=> import('./pages/dashboard/routes') }
    ],
    title: 'Dashboard',
  },
  { path: '', component: LandingComponent, title: 'WARTEG MANIA' , pathMatch:"full" },
  { path: '**', redirectTo: '/' },
];
