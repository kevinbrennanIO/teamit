import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { HomeComponent } from './components/home/home.component';
import {ButtonModule} from 'primeng/button';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeammemberListComponent } from './components/teammember-list/teammember-list.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [HomeComponent, TeamListComponent, TeammemberListComponent, PreferencesComponent, SearchComponent],
  imports: [
    CommonModule,
    JournalRoutingModule,
    ButtonModule
  ],
  exports: [
    HomeComponent,
    TeamListComponent,
    TeammemberListComponent,
    PreferencesComponent,
    SearchComponent
  ]
})
export class JournalModule { }
