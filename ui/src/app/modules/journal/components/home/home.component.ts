import { Component, OnInit } from '@angular/core';
import {TeamService} from '../../../../core/services/team.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  selectedTeam;

  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.teamService.currentlySelectedTeam.subscribe(team => {
      this.selectedTeam = team;
    });
  }
}
