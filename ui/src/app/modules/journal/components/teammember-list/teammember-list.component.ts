import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../../core/services/team.service';

@Component({
  selector: 'app-teammember-list',
  templateUrl: './teammember-list.component.html',
  styleUrls: ['./teammember-list.component.scss']
})
export class TeammemberListComponent implements OnInit {

  loading = false;
  teamName = 'choose team';
  selectedTeam: string;
  selectedTeamMember: string;
  selectedTeamMembers = [];


  constructor(
    private teamService: TeamService,
  ) {
  }

  ngOnInit(): void {
    // load the users of a selected team
    this.teamService.currentlySelectedTeam.subscribe(team => {
      this.teamService.getTeamMembers(team).subscribe((t: any) => {
        if (this.selectedTeam !== '') {
          this.selectedTeamMembers = t[0].members || [];
          this.teamName = t[0].name;
        }
      });
    });
  }

  broadcastSelectedTeamMember($event) {
    this.selectedTeamMember = $event.target.innerText;
    console.log(`BROADCASTING SELECTED TEAM MEMBER : ${this.selectedTeamMember}`);
    this.teamService.selectedTeamMember(this.selectedTeamMember);
  }

  highlightSelectedTeamMember(selected) {
    switch (selected) {
      case this.selectedTeamMember:
        return 'green';
    }
  }
}
