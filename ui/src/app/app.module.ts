import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {firebaseConfig} from './configs/firebase-config';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './modules/auth/auth.module';
import {JournalModule} from './modules/journal/journal.module';
import {SharedModule} from './shared/shared.module';

import {OKTA_CONFIG, OktaAuthModule} from '@okta/okta-angular';
import {oktaConfig} from '../../src/app/configs/okta-config';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    // OktaCallbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    OktaAuthModule,
    HttpClientModule,
    // Teamit Modules
    AuthModule,
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
