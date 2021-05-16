import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OktaAuthService} from '@okta/okta-angular';
import {IUser} from '../../shared/models/IUser';

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

  // check if selected team name is available
  isTeamnameAvailable(team: string) {
    return 200;
  }

  // create user entity within Okta
  createOktaEntity() {
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

  // fetch the email of loggedInUser
  async loggedInUser() {
    await this.oktaAuth.getUser().then((u) => {
      this.userEmail = u.email;
    });
    return this.userEmail;
  }

  // fetch full details for logged in user
  getFullUserDetails(user) {
    return this.db.collection<IUser>(`users`, ref =>
      ref.where('email', '==', user)).valueChanges();
  }

  // update user details
  updateUser(user, updates) {
    console.log(user, updates);
    // this.db.collection<IUser>(`users`, ref =>
    //   ref.where('email', '==', user)).stateChanges();
    // );
  }
}
