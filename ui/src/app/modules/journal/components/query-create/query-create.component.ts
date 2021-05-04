import {Component, OnInit} from '@angular/core';
import {IPost} from '../../../../shared/models/IPost';
import firebase from 'firebase';
import {UserService} from '../../../../core/services/user.service';
import firestore = firebase.firestore;
import {ContentService} from '../../../../core/services/content.service';
import {TeamService} from '../../../../core/services/team.service';
import {randomString} from '../../../../shared/utils/random';

@Component({
  selector: 'app-query-create',
  templateUrl: './query-create.component.html',
  styleUrls: ['./query-create.component.scss'],
})
export class QueryCreateComponent implements OnInit {

  selectedTeam: string;
  loggedInUser: string;

  queryPost: IPost = {
    id: undefined,
    body: '',
    createdBy: '',
    createdTime: undefined,
    resolvedBy: '',
    resolvedTime: undefined,
    status: '',
    tags: [],
    thumbsDown: 0,
    thumbsUp: 0,
    title: '',
    type: ''
  };

  constructor(
    private userService: UserService,
    private contentService: ContentService,
    private teamService: TeamService
  ) {
  }

  async ngOnInit() {
    this.loggedInUser = await this.userService.loggedInUser();

    this.teamService.currentlySelectedTeam.subscribe(team => {
      this.selectedTeam = team;
    });
  }

  onSubmit() {

    this.queryPost = {
      id: randomString(20),
      body: this.queryPost.body,
      createdBy: this.loggedInUser,
      createdTime: Date.now(),
      status: 'open',
      tags: this.queryPost.tags,
      thumbsDown: 0,
      thumbsUp: 0,
      title: this.queryPost.title,
      type: 'query'
    };
    console.log(`DEBUG OUTPUT --> ${this.queryPost}`);
    this.contentService.writePostToDB(this.queryPost, this.selectedTeam);
    this.reset();
  }

  onClear() {
    this.reset();
  }

  reset() {
    this.queryPost = {
      id: undefined,
      body: '',
      createdBy: '',
      createdTime: undefined,
      resolvedBy: '',
      resolvedTime: undefined,
      status: '',
      tags: [],
      thumbsDown: 0,
      thumbsUp: 0,
      title: '',
      type: ''
    };
  }
}
