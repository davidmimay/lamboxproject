import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

// Modules
import { ForumModule } from './../forum/forum.module';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { GoogleSigninDirective } from './google-signin.directive';

// Components
import { EmailLoginComponent } from './email-login/email-login.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { BioComponent } from './bio/bio.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { YoutubeSubsComponent } from './youtube-subs/youtube-subs.component';

@NgModule({
  declarations: [
    GoogleSigninDirective,
    EmailLoginComponent,
    LoginPageComponent,
    SubscribeComponent,
    BioComponent,
    EditProfileComponent,
    ViewProfileComponent,
    UpgradeComponent,
    YoutubeSubsComponent,
  ],
  exports: [
    GoogleSigninDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ForumModule
  ]
})
export class UserModule { }
