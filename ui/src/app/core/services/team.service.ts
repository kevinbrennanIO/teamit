import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamDataSource = new BehaviorSubject<any>('');
  currentlySelectedTeam = this.teamDataSource.asObservable();

  constructor(
    private db: AngularFirestore
  ) {
  }
  selectedTeam(team) {
    this.teamDataSource.next(team);
  }

  // returns a list of team members
  getTeamMembers(teamName: string) {
    return this.db.collection('teams', ref =>
      ref.where('name', '==', teamName)).valueChanges();
  }


}
