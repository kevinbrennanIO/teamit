import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../../core/services/user.service';
import {TeamService} from '../../../../core/services/team.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  constructor(
    private userService: UserService,
    private teamService: TeamService
  ) {
  }

  public userTeams = [];

  ngOnInit(): void {
    // get teams for currently logged user
    this.userService.getUserTeams().then((users) => {
      users.subscribe((user: any) => {
        user[0].teams.forEach((team) => {
          this.userTeams.push(team);
        });
      });
    });
  }

  broadcastSelectedTeam($event) {
    this.teamService.selectedTeam($event.target.innerText);
  }
}
