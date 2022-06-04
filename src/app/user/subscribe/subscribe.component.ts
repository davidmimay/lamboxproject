import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})

export class SubscribeComponent {

  constructor(public auth: AuthService) {}
  
}