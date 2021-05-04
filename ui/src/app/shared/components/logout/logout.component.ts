import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public oktaAuth: OktaAuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.oktaAuth.signOut().then(r => {});
  }
}
