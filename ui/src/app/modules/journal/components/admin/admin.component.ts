import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  selectedTab = '';

  constructor() { }

  ngOnInit(): void {
  }

  metricEvent() {
    this.selectedTab = 'Team Metrics';
  }

  manageEvent() {
    this.selectedTab = 'Team Manage';
  }
}
