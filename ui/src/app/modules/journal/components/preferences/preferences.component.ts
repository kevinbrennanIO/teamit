import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../core/services/user.service';
import {GlobalConstants} from '../../../../common/global-constants';
import {IUser} from '../../../../shared/models/IUser';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  public loggedInUser;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.userService.getFullUserDetails(GlobalConstants.LOGGED_IN_USER).subscribe( data => {
      this.loggedInUser = data[0];
      console.log(data[0]);
    });
  }

  // updateUser() {
  //   console.table(this.loggedInUser);
  //   this.userService.updateUser(this.loggedInUser.email, this.loggedInUser);
  // }
}
