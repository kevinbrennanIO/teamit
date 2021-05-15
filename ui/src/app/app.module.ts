import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {JournalModule} from './modules/journal/journal.module';
import {OKTA_CONFIG, OktaAuthModule} from '@okta/okta-angular';
import {firebaseConfig} from './configs/firebase-config';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {oktaConfig} from './configs/okta-config';
import {AngularFireModule} from '@angular/fire';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    OktaAuthModule,
    HttpClientModule,

    // Teamit Modules
    JournalModule,
    SharedModule
  ],
  providers: [
    {provide: OKTA_CONFIG, useValue: oktaConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
