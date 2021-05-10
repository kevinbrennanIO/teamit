import {Component, OnInit} from '@angular/core';
import {IPost} from '../../../../shared/models/IPost';
import firebase from 'firebase';
import firestore = firebase.firestore;
import {UserService} from '../../../../core/services/user.service';
import {ContentService} from '../../../../core/services/content.service';
import {TeamService} from '../../../../core/services/team.service';
import {randomString} from '../../../../shared/utils/random';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss'],
})
export class BlogCreateComponent implements OnInit {

  loggedInUser: string;
  selectedTeam: string;
  blogPost: IPost = {body: '', createdBy: '', createdTime: undefined, type: '', id: undefined};

  constructor(
    private userService: UserService,
    private contentService: ContentService,
    private teamService: TeamService,
  ) {
  }

 async ngOnInit() {
    this.loggedInUser = await this.userService.loggedInUser();

    this.teamService.currentlySelectedTeam.subscribe(team => {
      this.selectedTeam = team;
   });
  }

  onSubmit() {
    this.blogPost = {
      id: randomString(20),
      createdBy: this.loggedInUser,
      createdTime: Date.now(),
      type: 'blog',
      body: this.blogPost.body,
      thumbsUp: 0,
      thumbsDown: 0
    };
    console.log(`DEBUG OUTPUT --> ${this.blogPost}`);
    this.contentService.writePostToDB(this.blogPost, this.selectedTeam);
    this.blogPost = {body: '', createdBy: '', createdTime: undefined, type: '', id: undefined};
  }

  onClear() {
    this.blogPost = {body: '', createdBy: '', createdTime: undefined, type: '', id: undefined};
  }
}
