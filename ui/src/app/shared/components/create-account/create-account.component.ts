import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  public userEmail = null;
  public userPassword = null;
  public validationFailed: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  // TODO: switch to using Angular reactive forms - better input validation
  public createAccount() {
    if (this.userEmail === null || this.userPassword === null) {
      this.validationFailed = true;
    } else {
      this.validationFailed = false;
      // call to Okta
      //...

      this.userPassword = null;
      this.userEmail = null;
    }
  }

}
