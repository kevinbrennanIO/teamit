import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {IPost} from '../../shared/models/IPost';
import {OktaAuthService} from '@okta/okta-angular';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(
    public db: AngularFirestore,
    public oktaAuth: OktaAuthService
  ) {
  }

  writePostToDB(postObject: IPost, teamName: string) {
    // Add a new query or blog record with a generated id.
    // TODO: dynamic team name required
    this.db.collection(`teams/${teamName}/posts`).doc(postObject.id).set(postObject)
      .then((d) => {
        console.log(`${postObject.type} written with ID:`, postObject.id);
      })
      .catch((error) => {
        console.error(`Error adding ${postObject.type}: `, error);
      });
  }

  fetchTeamPosts(teamName: string, userEmail: string) {
    if (teamName) {
      return this.db.collection<IPost>(`teams/${teamName}/posts`, ref =>
        ref.where('createdBy', '==', userEmail)
          .orderBy('createdTime', 'asc'))
        .valueChanges();
    }
  }

  // delete post by ID
  deletePost(teamName: string, postID: string) {
    const query = this.db.collection(`teams/${teamName}/posts`).ref.where('id', '==', postID);
    query.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete().then(r => {});
      });
    });
  }
}
