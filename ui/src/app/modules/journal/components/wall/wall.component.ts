import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  posts = [];
  teamName = 'CHANGE ME';
  welcomeClosed = false;
  welcomeMessageTeam = `Welcome to team ${this.teamName}!`;
  welcomeMessage = 'Update your journal regularly and communicate your progress with the team.';

  constructor() { }

  ngOnInit(): void {
  }

  closeWelcome() {
    this.welcomeClosed = true;
  }
}
