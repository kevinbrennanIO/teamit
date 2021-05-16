import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PreferencesComponent} from './components/preferences/preferences.component';
import {SearchComponent} from './components/search/search.component';
import {AdminComponent} from './components/admin/admin.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'preferences', component: PreferencesComponent},
  {path: 'search', component: SearchComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule {
}
