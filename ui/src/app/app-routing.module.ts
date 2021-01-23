import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorComponent } from './shared/components/error/error.component';

const routes: Routes = [
  // Auth Routes
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  // Main Routes
  {
    path: ':id',
    loadChildren: () => import('./modules/journal/journal.module').then(m => m.JournalModule),
  },

  // Error Routes
  { path: '**', component: ErrorComponent },


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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
