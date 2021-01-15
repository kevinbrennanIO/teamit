import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    JournalRoutingModule
  ],
  exports: [
    HomeComponent
  ]
})
export class JournalModule { }
