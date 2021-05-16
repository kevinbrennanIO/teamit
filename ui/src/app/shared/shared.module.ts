import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorComponent} from './components/error/error.component';
import {ButtonModule} from 'primeng/button';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {CreateAccountComponent} from './components/create-account/create-account.component';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {LoadingComponent} from './components/loading/loading.component';

@NgModule({
  declarations: [
    ErrorComponent,
    LoginComponent,
    LogoutComponent,
    CreateAccountComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    RouterModule,
    ReactiveFormsModule,
    ToastModule,
    TooltipModule

  ],
  exports: [
    ErrorComponent,
    LoginComponent,
    LogoutComponent,
    CreateAccountComponent,
    ReactiveFormsModule,
    ToastModule,
    TooltipModule,
    LoadingComponent
  ]
})
export class SharedModule {
}
