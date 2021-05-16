import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {TeamService} from '../../../../core/services/team.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {

  createOptions: MenuItem[];
  activeOption: MenuItem;
  selectedTeamMember = '';

  constructor(
    private teamService: TeamService
  ) {
  }

  ngOnInit() {
    // subscribe to the selected user
    this.teamService.currentlySelectedUser.subscribe(user => {
      this.selectedTeamMember = user;
    });

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
