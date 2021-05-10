import {Component, OnInit} from '@angular/core';
import {ContentService} from '../../../../core/services/content.service';
import {TeamService} from '../../../../core/services/team.service';
import {UserService} from '../../../../core/services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comments;
  body = '';
  selectedPostID;
  selectedTeam;
  userEmail;

  constructor(
    private contentService: ContentService,
    private teamService: TeamService,
    private userService: UserService
  ) {
  }


  async ngOnInit() {

    this.userEmail = await this.userService.loggedInUser();

    this.teamService.currentlySelectedPostID.subscribe(postID => {
      this.selectedPostID = postID;

      this.teamService.currentlySelectedTeam.subscribe(team => {
        this.selectedTeam = team;

        this.comments = this.contentService.fetchPostComments(this.selectedTeam, this.selectedPostID);
      });
    });
  }

  convertTimestamp(unixTimeStamp) {
    return new Date(unixTimeStamp).toLocaleString();
  }

  commentOnPost() {
    const payload = {
      body: this.body,
      createdBy: this.userEmail,
      createdTime: Date.now()
    };
    this.contentService.createComment(
      this.selectedTeam,
      this.selectedPostID,
      payload
    );
    this.body = '';
  }
}
