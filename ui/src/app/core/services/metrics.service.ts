import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {take} from 'rxjs/operators';
import {ITeam} from '../../shared/models/ITeam';
import {IPost} from '../../shared/models/IPost';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  constructor(
    private db: AngularFirestore,
    private http: HttpClient
  ) {
  }

  getTeamMembers(team) {
    return this.db.collection<ITeam>('teams', ref =>
      ref.where('name', '==', team))
      .valueChanges()
      .pipe(take(1));
  }

  getTeamMemberFullProfile(userID) {
    return this.db.collection<ITeam>('users', ref =>
      ref.where('email', '==', userID))
      .valueChanges()
      .pipe(take(1));
  }

  getQueryCollaboration(team) {
    return this.db.collection(`teams/${team}/posts`)
      .valueChanges();
  }

  getContributionData(team, userID) {
    return this.db.collection<IPost>(`teams/${team}/posts`, ref =>
      ref.where('createdBy', '==', userID))
      .valueChanges()
      .pipe(take(1));
  }

  getTagAnalysis(team) {
    return this.db.collection<IPost>(`teams/${team}/posts`, ref =>
      ref.where('type', '==', 'query'))
      .valueChanges();
  }

  getTeamSentiment(teamName) {
    return this.http.get(GlobalConstants.SENTIMENT_API, {params: {team: teamName}});
  }

  getIndividualSentiment(teamName, userID) {
    return this.http.get(GlobalConstants.SENTIMENT_API, {
      params:
        {
          team: teamName,
          user: userID
        }
    });
  }
}
