import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OktaAuthService} from '@okta/okta-angular';

import {IUser} from '../../shared/models/IUser';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userAPI = 'http://localhost:2410/api/v1/user';
  usersCollection: AngularFirestoreCollection<IUser>;
  userEmail;

  constructor(
    private db: AngularFirestore,
    private http: HttpClient,
    public oktaAuth: OktaAuthService
  ) {
  }

  // check availability prior to creation
  async isUsernameAvailable(email: string) {
    let responseCode: number = null;
    const params = new HttpParams().set('email', email);

    await this.http.get(this.userAPI, {
      params,
      responseType: 'text',
      observe: 'response'
    }).toPromise().then(resp => {
      responseCode = resp.status;
    }).finally();
    return responseCode;
  }

  isTeamnameAvailable(team: string) {
    return 200;
  }

  createOktaEntity() {

  }

  createFirestoreEntity() {

  }

  // returns a list of teams for a given user
  async getUserTeams() {
    let email = '';
    await this.oktaAuth.getUser().then((u) => {
      email = u.email;
    });
    return this.db.collection('users', ref =>
      ref.where('email', '==', email)).valueChanges();
  }

  async loggedInUser() {
    await this.oktaAuth.getUser().then((u) => {
      this.userEmail = u.email;
    });
    return this.userEmail;
  }
}
