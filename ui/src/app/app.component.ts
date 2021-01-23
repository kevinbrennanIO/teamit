import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // title = 'ui';
  // teams$: Observable<any[]>;

  // constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    // this.teams$ = this.firestore.collection('teams').valueChanges();
  }
}
