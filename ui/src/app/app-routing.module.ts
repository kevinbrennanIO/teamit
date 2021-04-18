import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {ErrorComponent} from './shared/components/error/error.component';
import {LoginComponent} from './shared/components/login/login.component';
import {LogoutComponent} from './shared/components/logout/logout.component';
import {CreateAccountComponent} from './shared/components/create-account/create-account.component';
import {OktaAuthGuard, OktaCallbackComponent, OktaLoginRedirectComponent} from '@okta/okta-angular';


const appRoutes: Routes = [

  // Landing Page
  {
    path: '',
    component: CreateAccountComponent
  },
  // Auth Routes
  {
    path: 'login',
    component: OktaLoginRedirectComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent
  },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  //   canActivate: [OktaAuthGuard],
  //   children: [
  //     { path: 'login' },
  //     { path: 'reset-password' },
  //     { path: 'signup' }
  //   ]
  // },

  // Main Routes
  {
    path: ':id',
    loadChildren: () => import('./modules/journal/journal.module').then(m => m.JournalModule),
    canActivate: [OktaAuthGuard],
  },

  // Error Routes
  {path: '**', component: ErrorComponent},


  // {
  //   path: '',
  //   component: AppComponent,
  // },
  // {path: '', redirectTo: '/home', pathMatch: 'full'},

  // {
  //   path: 'auth',
  //   loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
