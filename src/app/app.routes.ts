import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {path: 'landingpage', loadComponent: () => import('./Components/landing-page/landing-page.component').then(m => m.LandingPageComponent)},
    {path: '', redirectTo: '/landingpage', pathMatch: 'full'},
    {path: 'about', loadComponent: () => import('./Components/about/about.component').then(m => m.AboutComponent)},
    {path: 'register', loadComponent: () => import('./Components/register/register.component').then(m => m.RegisterComponent)},
    {path: 'login', loadComponent: () => import('./Components/login/login.component').then(m => m.LoginComponent)},
    {path: 'dashboard', loadComponent: () => import('./Components/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard]},
];
