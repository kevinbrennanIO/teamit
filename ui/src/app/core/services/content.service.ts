import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {IPost} from '../../shared/models/IPost';
import {OktaAuthService} from '@okta/okta-angular';
import firebase from 'firebase';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

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
        doc.ref.delete().then(r => {
        });
      });
    });
  }

  async thumbsUp(teamName, postID) {
    let currentThumbsUp;
    await this.db.collection(`teams/${teamName}/posts`).doc(postID).get().toPromise().then(
      (doc: DocumentSnapshot<IPost>) => {
      if (doc.exists) {
        currentThumbsUp = doc.data().thumbsUp;
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document: ', error);
    });
    const newThumbsUp = currentThumbsUp + 1;
    console.log(newThumbsUp);
    this.db.collection<IPost>(`teams/${teamName}/posts`).doc(postID).update({
      thumbsUp: newThumbsUp
    }).then(r => {});
  }

  async thumbsDown(teamName, postID) {
    let currentThumbsDown;
    await this.db.collection(`teams/${teamName}/posts`).doc(postID).get().toPromise().then(
      (doc: DocumentSnapshot<IPost>) => {
        if (doc.exists) {
          currentThumbsDown = doc.data().thumbsDown;
        } else {
          console.log('No such document!');
        }
      }).catch((error) => {
      console.log('Error getting document: ', error);
    });
    const newThumbsDown = currentThumbsDown + 1;
    console.log(newThumbsDown);
    this.db.collection<IPost>(`teams/${teamName}/posts`).doc(postID).update({
      thumbsDown: newThumbsDown
    }).then(r => {});
  }
}
