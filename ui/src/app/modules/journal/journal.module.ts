import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {JournalRoutingModule} from './journal-routing.module';
import {HomeComponent} from './components/home/home.component';
import {ButtonModule} from 'primeng/button';
import {TeamListComponent} from './components/team-list/team-list.component';
import {TeammemberListComponent} from './components/teammember-list/teammember-list.component';
import {PreferencesComponent} from './components/preferences/preferences.component';
import {SearchComponent} from './components/search/search.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {WallComponent} from './components/wall/wall.component';
import {ComposeComponent} from './components/compose/compose.component';
import {TooltipModule} from 'primeng/tooltip';
import {ChipModule} from 'primeng/chip';
import {DividerModule} from 'primeng/divider';
import {EditorModule} from 'primeng/editor';
import {TabViewModule} from 'primeng/tabview';
import {BlogCreateComponent} from './components/blog-create/blog-create.component';
import {QueryCreateComponent} from './components/query-create/query-create.component';
import {TodoCreateComponent} from './components/todo-create/todo-create.component';
import {InputTextModule} from 'primeng/inputtext';
import {ChipsModule} from 'primeng/chips';
import {QuillModule} from 'ngx-quill';
import {PanelModule} from 'primeng/panel';
import {SidebarModule} from 'primeng/sidebar';
import {AdminComponent} from './components/admin/admin.component';

@NgModule({
  declarations: [
    HomeComponent,
    TeamListComponent,
    TeammemberListComponent,
    PreferencesComponent,
    SearchComponent,
    WallComponent,
    ComposeComponent,
    BlogCreateComponent,
    QueryCreateComponent,
    TodoCreateComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    JournalRoutingModule,
    SharedModule,
    ButtonModule,
    FormsModule,
    TooltipModule,
    ChipModule,
    DividerModule,
    TabViewModule,
    EditorModule,
    InputTextModule,
    ChipsModule,
    QuillModule.forRoot({
      modules: {
        syntax: true
      }
    }),
    PanelModule,
    SidebarModule
  ],
  exports: [
    HomeComponent,
    TeamListComponent,
    TeammemberListComponent,
    PreferencesComponent,
    SearchComponent
  ]
})
export class JournalModule {
}
