import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ErrorComponent} from './shared/components/error/error.component';
import {LogoutComponent} from './shared/components/logout/logout.component';
import {CreateAccountComponent} from './shared/components/create-account/create-account.component';
import {OktaAuthGuard, OktaCallbackComponent} from '@okta/okta-angular';
import {HomeComponent} from './modules/journal/components/home/home.component';
import {SearchComponent} from './modules/journal/components/search/search.component';
import {PreferencesComponent} from './modules/journal/components/preferences/preferences.component';
import {AdminComponent} from './modules/journal/components/admin/admin.component';

const CALLBACK_PATH = 'login/callback';

const appRoutes: Routes = [

  // Landing Page
  {
    path: '',
    component: CreateAccountComponent
  },
  // Auth Routes
  {
    path: 'login',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: CALLBACK_PATH,
    component: OktaCallbackComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [OktaAuthGuard],
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'preferences',
    component: PreferencesComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [OktaAuthGuard]
  },

  // Error Routes
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
