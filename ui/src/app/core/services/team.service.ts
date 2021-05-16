import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject} from 'rxjs';
import {ITeam} from '../../shared/models/ITeam';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private postIDDataSource = new BehaviorSubject<any>('');
  currentlySelectedPostID = this.postIDDataSource.asObservable();

  private teamDataSource = new BehaviorSubject<any>('');
  currentlySelectedTeam = this.teamDataSource.asObservable();

  private userDataSource = new BehaviorSubject<any>('');
  currentlySelectedUser = this.userDataSource.asObservable();

  constructor(
    private db: AngularFirestore
  ) {
  }

  // broadcast the selected Team
  selectedTeam(team) {
    this.teamDataSource.next(team);
  }

  // broadcast selected Team Member
  selectedTeamMember(user) {
    this.userDataSource.next(user);
  }

  // broadcast selected postID
  selectedPostID(postID) {
    this.postIDDataSource.next(postID);
  }

  // returns a list of team members
  getTeamMembers(teamName: string) {
    return this.db.collection('teams', ref =>
      ref.where('name', '==', teamName)).valueChanges();
  }

  // returns the teams for a loggedIn Admin
  loggedInUserAdminTeams(userEmail) {
    return this.db.collection<ITeam>('teams', ref =>
      ref.where('administrators', 'array-contains', userEmail)).valueChanges();
  }
}
