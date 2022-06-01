import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-youtube-subs',
  templateUrl: './youtube-subs.component.html',
  styleUrls: ['./youtube-subs.component.scss']
})
export class YoutubeSubsComponent {

  constructor(public auth: AuthService) {}

}