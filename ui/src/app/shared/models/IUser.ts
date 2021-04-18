import { AngularFirestore } from '@angular/fire/firestore';
// import { firestore } from 'firebase';

export class User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  constructor(email: string) {
    this.email = email;
  }
}

export interface IUser {

    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    // dob: firestore.Timestamp;
    hobbies?: Array<string>;
    jobTitle?: string;
    // location?: firestore.Geopoint;
    nationality?: string;
}
