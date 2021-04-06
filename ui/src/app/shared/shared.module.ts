import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { InputTextModule } from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ErrorComponent,
    ProfileComponent,
    LoginComponent,
    LogoutComponent,
    CreateAccountComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    RouterModule
  ],
  exports: [
    ErrorComponent,
    ProfileComponent,
    LoginComponent,
    LogoutComponent,
    CreateAccountComponent
  ]
})
export class SharedModule { }
