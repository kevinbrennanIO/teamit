import firebase from 'firebase';

export interface IPost {

  title?: string;
  body: string;
  createdBy: string;
  createdTime: firebase.firestore.Timestamp;
  resolvedBy?: string;
  resolvedTime?: firebase.firestore.Timestamp;
  tags?: string[];
  status?: string;
  type: string;
  thumbsUp?: string;
  thumbsDown?: string;

}
