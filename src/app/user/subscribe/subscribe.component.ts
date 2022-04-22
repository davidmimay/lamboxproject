import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
// *** NEW ***
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase                              from 'firebase/app';
// import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import {loadStripe} from '@stripe/stripe-js';
import {filter, first, map, startWith, switchMap} from 'rxjs/operators';
import 'firebase/functions';
import { SubscribedService } from './../../services/subscribed.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})

export class SubscribeComponent implements OnInit {

  private youtubeUrl:string = 'https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails'; // private youtubeUrl:string = 'https://youtube.googleapis.com/youtube/v3';
  private apikey:string = environment.firebaseConfig.apiKey;
  private channelId:string = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';

  videos: any[] = [];

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    public subscribedService: SubscribedService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public http:HttpClient,
  ) {}

  ngOnInit(): void {}

  checkSubscription() {
    this.getSubscription().subscribe(videos => this.videos = videos);
  }

  getSubscription() {
    // https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&forChannelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&mine=true&key=AIzaSyCPa30Iz5WHlbLkB2l4AoQQLzCsvNMTfvE
    // https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&forChannelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&mine=true&key=[YOUR_API_KEY] HTTP/1.1
    // Authorization: Bearer [YOUR_ACCESS_TOKEN]
    // Accept: application/json

    let url = `${ this.youtubeUrl }`; // let url = `${ this.youtubeUrl }/subscriptions`;
    let params = new HttpParams();

    // params = params.append('part', 'snippet,contentDetails');
    params = params.append('forChannelId', this.channelId);
    params = params.append('mine', 'true');
    params = params.append('key', this.apikey);

    return this.http.get( url, { params } ).pipe( map( (res: any) => {
      console.log(res);
      let videos: any[] = [];
      for ( let video of res.items ) {
        let snippet = video.snippet;
        videos.push( snippet );
      }
      return videos;
    }) );

  }

  
  
  
  
}