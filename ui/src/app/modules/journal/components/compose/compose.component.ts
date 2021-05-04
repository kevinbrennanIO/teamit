import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {

  createOptions: MenuItem[];
  activeOption: MenuItem;

  constructor() {
  }

  ngOnInit() {
    this.createOptions = [
      {
        label: 'blog',
        icon: 'pi pi-fw pi-pencil'
      },
      {
        label: 'query',
        icon: 'pi pi-fw pi-question-circle'
      },
      {
        label: 'todo',
        icon: 'pi pi-fw pi-check',
        disabled: true
      },
    ];
    this.activeOption = this.createOptions[0];
  }
}
