import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent,
  // },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: '',
    loadChildren: () => import('./modules/journal/journal.module').then(m => m.JournalModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
