import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeammemberListComponent} from './components/teammember-list/teammember-list.component';
import {QueryCreateComponent} from './components/query-create/query-create.component';
import {PreferencesComponent} from './components/preferences/preferences.component';
import {TodoCreateComponent} from './components/todo-create/todo-create.component';
import {BlogCreateComponent} from './components/blog-create/blog-create.component';
import {TeamListComponent} from './components/team-list/team-list.component';
import {CommentsComponent} from './components/comments/comments.component';
import {MetricsComponent} from './components/metrics/metrics.component';
import {ComposeComponent} from './components/compose/compose.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ManageComponent} from './components/manage/manage.component';
import {SearchComponent} from './components/search/search.component';
import {AdminComponent} from './components/admin/admin.component';
import {HomeComponent} from './components/home/home.component';
import {WallComponent} from './components/wall/wall.component';
import {JournalRoutingModule} from './journal-routing.module';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {SharedModule} from '../../shared/shared.module';
import {NgAisModule} from 'angular-instantsearch';
import {InputTextModule} from 'primeng/inputtext';
import {PanelMenuModule} from 'primeng/panelmenu';
import {DropdownModule} from 'primeng/dropdown';
import {TooltipModule} from 'primeng/tooltip';
import {DividerModule} from 'primeng/divider';
import {TabViewModule} from 'primeng/tabview';
import {SidebarModule} from 'primeng/sidebar';
import {EditorModule} from 'primeng/editor';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {ChartModule} from 'primeng/chart';
import {ChipsModule} from 'primeng/chips';
import {PanelModule} from 'primeng/panel';
import {BadgeModule} from 'primeng/badge';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ChipModule} from 'primeng/chip';
import {QuillModule} from 'ngx-quill';



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
    AdminComponent,
    NavbarComponent,
    MetricsComponent,
    ManageComponent,
    CommentsComponent
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
    PanelModule,
    SidebarModule,
    ChartModule,
    InputTextareaModule,
    CardModule,
    BadgeModule,
    PanelMenuModule,
    DropdownModule,
    TableModule,
    NgAisModule.forRoot(),
    QuillModule.forRoot({
      modules: {
        syntax: true
      }
    })
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
