import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  // { path: '', loadChildren: () => import('./public/login/login.module').then(m => m.LoginModule) },
  { path: '', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  {
    path: '',
    component: BodyComponent,
    children: [
      // { path: '', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
      // { path: 'terms', loadChildren: () => import('./public/terms/terms.module').then(m => m.TermsModule) },
      // { path: 'privacy', loadChildren: () => import('./public/privacy/privacy.module').then(m => m.PrivacyModule) },
    ]
  },
  {
    path: '',
    component: BodyComponent,
    canActivate: [AuthGuard],
    children: [
      // { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]
  },
  { path: 'register', loadChildren: () => import('./public/register/register.module').then(m => m.RegisterModule) },
  { path: '404', loadChildren: () => import('./public/error/error.module').then(m => m.ErrorModule) },
  // { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  {
    path: '**', redirectTo: '/404'
  },
  {
    path: 'beta',
    component: BodyComponent,
    resolve: { url: 'externalUrlRedirectResolver' },
    data: { externalUrl: 'http://pos.urbankisaan.com/beta/' }
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
