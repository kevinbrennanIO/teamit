import firebase from 'firebase';

export interface IPost {
  title?: string;
  body: string;
  createdBy: string;
  createdTime: number;
  resolvedBy?: string;
  resolvedTime?: firebase.firestore.Timestamp;
  tags?: string[];
  status?: string;
  type: string;
  thumbsUp?: number;
  thumbsDown?: number;
  id: string;
}
