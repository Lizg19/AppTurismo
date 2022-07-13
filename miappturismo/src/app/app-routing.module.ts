import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
    
  },
  
  {
    path: 'viewturista',
    loadChildren: () => import('./viewturista/viewturista.module').then( m => m.ViewturistaPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'viewpropietario',
    loadChildren: () => import('./viewpropietario/viewpropietario.module').then( m => m.ViewpropietarioPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'viewadmin',
    loadChildren: () => import('./viewadmin/viewadmin.module').then( m => m.ViewadminPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found.module').then( m => m.PageNotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
