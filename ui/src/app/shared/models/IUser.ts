import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

export interface ITeam {

    firstname: string;
    lastname: string;
    dob: firestore.Timestamp;
    email: string;
    hobbies: Array<string>;
    jobTitle: string;
    location: firestore.Geopoint;
    nationality: string;
}
