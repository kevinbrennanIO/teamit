import {Component, OnInit} from '@angular/core';
import {ContentService} from '../../../../core/services/content.service';
import {UserService} from '../../../../core/services/user.service';
import {TeamService} from '../../../../core/services/team.service';
import {IPost} from '../../../../shared/models/IPost';
import {MessageService} from 'primeng/api';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
  providers: [MessageService]
})
export class WallComponent implements OnInit {

  posts: Observable<IPost[]> = null;
  loading = true;
  showComments = false;
  selectedTeam = '';
  userEmail;
  today = new Date().toDateString();

  constructor(
    private contentService: ContentService,
    private userService: UserService,
    private teamService: TeamService,
    private messageService: MessageService
  ) {
  }

  async ngOnInit() {
    this.userEmail = await this.userService.loggedInUser();
    // get currently selected team
    this.teamService.currentlySelectedTeam.subscribe(team => {
      // load team specific posts
      this.selectedTeam = team;
      this.posts = this.contentService.fetchTeamPosts(team, this.userEmail);
      this.loading = false;
    });
  }

  toggleComments() {
    if (this.showComments) {
      this.showComments = false;
    } else {
      this.showComments = true;
    }
  }

  editPost() {
    this.messageService.add(
      {
        severity: 'warn',
        summary: 'Editing error',
        detail: `Please try again later. Editing is currently not allowed.`
      }
    );
  }

  deletePost(postID: string) {
    this.contentService.deletePost(this.selectedTeam, postID);
    this.messageService.add(
      {
        severity: 'error',
        summary: 'Deleted',
        detail: `Post with ID: ${postID} has been deleted.`
      }
    );
  }

  thumbsUpPost() {

  }

  thumbsDownPost() {

  }

  convertTime(unixTimeStamp: number) {
    return new Date(unixTimeStamp).toLocaleTimeString(
      [],
      {hour: '2-digit', minute: '2-digit'}
    );
  }

  convertDate(unixTimeStamp: number) {
    return new Date(unixTimeStamp).toLocaleDateString();
  }
}
