import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  user$: Observable<firebase.User>; 
  calendarItems: any[];
  youtubeItems: any[];

  constructor(public afAuth: AngularFireAuth) { 
    this.initClient();
    this.user$ = afAuth.authState;
  }

  // ✅ INIT CLIENT YOUTUBE
  initClient() {
    gapi.load('client', () => {
      console.log('loaded client')

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: environment.firebaseConfig.apiKey,
        clientId: '920807818168-topig3d8j82hrfg47pittjlsofuqlo8b.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        scope: 'https://www.googleapis.com/auth/youtube.readonly'
      })

      gapi.client.load('youtube', 'v3', () => console.log('loaded youtube'));

    });
  }

  async login() {
    // Approach 1: Login using Google Auth2 token
    /*
    const googleAuth = gapi.auth2.getAuthInstance()
    const googleUser = await googleAuth.signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"});// const googleUser = await googleAuth.signIn();
    const token = googleUser.getAuthResponse().id_token;
    console.log(googleUser)
    const credential = auth.GoogleAuthProvider.credential(token);
    await this.afAuth.auth.signInWithCredential(credential); // await this.afAuth.auth.signInAndRetrieveDataWithCredential(credential);
    */

    // Approach 2: Use Firebase login with scopes and make RESTful API calls
    const provider = new auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/youtube.readonly') // provider.addScope('https://www.googleapis.com/auth/calendar');
    this.afAuth.auth.signInWithPopup(provider)
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  // ✅ CHECK YOUTUBE STATUS
  async getYoutuber() {
    await gapi.client.load("youtube", "v3");
    const events = await gapi.client.youtube.subscriptions.list({
      part: ['snippet,contentDetails'],
      forChannelId: 'UCt3hkamH765L19U3inGFzfg',
      mine: true
      })
      console.log(events)
      this.youtubeItems = events.result.items;
  }

}

// SOURCE: https://github.com/AngularFirebase/138-google-calendar-firebase-auth