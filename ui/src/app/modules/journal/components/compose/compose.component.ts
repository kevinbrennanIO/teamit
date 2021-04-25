import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComposeComponent implements OnInit {

  constructor() {
  }

  createOptions: MenuItem[];
  activeOption: MenuItem;

  text: string;


  ngOnInit() {
    this.createOptions = [
      {label: 'blog', icon: 'pi pi-fw pi-pencil'},
      {label: 'query', icon: 'pi pi-fw pi-question-circle'},
      {label: 'todo', icon: 'pi pi-fw pi-check'},
    ];
    this.activeOption = this.createOptions[0];
    console.log(this.activeOption);
  }

  changeActiveOption($event) {
    console.log($event.index);
  }
}

