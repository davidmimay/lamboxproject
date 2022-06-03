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
  // new
  events: any;


  constructor(public afAuth: AngularFireAuth) { 
    this.initClient();
    this.user$ = afAuth.authState;
  }
/*
  // Initialize the Google API client with desired scopes
  initClient() {
    gapi.load('client', () => {
      console.log('loaded client')

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: environment.firebaseConfig.apiKey,
        clientId: '920807818168-topig3d8j82hrfg47pittjlsofuqlo8b.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      })
      console.log('hello', gapi.client.init);
      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));

    });

  }
*/
  // INIT CLIENT YOUTUBE
  
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
  /*
  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  */

  async login() {

    // const googleAuth = gapi.auth2.getAuthInstance()
    const googleAuth = gapi.auth2.getAuthInstance()
      //.signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})

    const googleUser = await googleAuth.signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"});// const googleUser = await googleAuth.signIn();

    const token = googleUser.getAuthResponse().id_token;

    console.log(googleUser)

    const credential = auth.GoogleAuthProvider.credential(token);
    
    await this.afAuth.auth.signInWithCredential(credential); // await this.afAuth.auth.signInAndRetrieveDataWithCredential(credential);


    // Alternative approach, use the Firebase login with scopes and make RESTful API calls

    // const provider = new auth.GoogleAuthProvider()
    // provider.addScope('https://www.googleapis.com/auth/calendar');

    // this.afAuth.auth.signInWithPopup(provider)
    
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  async getYoutuber() {
    await gapi.client.load("youtube", "v3");

    const events = await gapi.client.youtube.subscriptions.list({
      part: ['snippet,contentDetails'],
      forChannelId: 'UC_x5XG1OV2P6uZZ5FSM9Ttw', // Google Developers channel
      mine: true
      })

      console.log(events)

      this.youtubeItems = events.result.items;
    
  }
     
  async getCalendar(){
    await gapi.client.load("calendar", "v3");

    const events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      //timeMin: new Date().toISOString(),
      //showDeleted: false,
      //singleEvents: true,
      maxResults: 5,
      //orderBy: 'startTime',
    })

    console.log(events)
    
    this.calendarItems = events.result.items;
    
  }
  

  async insertEvent() {
    const insert = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      start: {
        dateTime: hoursFromNow(2),
        timeZone: 'America/Los_Angeles'
      }, 
      end: {
        dateTime: hoursFromNow(3),
        timeZone: 'America/Los_Angeles'
      }, 
      summary: 'Have Fun!!!',
      description: 'Do some cool stuff and have a fun time doing it'
    })

    await this.getCalendar();
  }


}

const hoursFromNow = (n) => new Date(Date.now() + n * 1000 * 60 * 60 ).toISOString();
