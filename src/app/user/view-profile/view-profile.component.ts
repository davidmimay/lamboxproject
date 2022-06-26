import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { SeoService } from 'src/app/services/seo.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
  user: any = {};
  threads: any[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private seo: SeoService
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);

    this.getProfile(id);
    this.getUsersPosts(id);
  }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Customer List',
      description: 'A list with customers'
    })
  }

  getProfile(id: string) {
    // firebase.firestore().settings({
    //   timestampsInSnapshots: true
    // })

    firebase
      .firestore()
      .collection('users')
      .doc(id)
      .get()
      .then((documentSnapshot) => {
        this.user = documentSnapshot.data();
        // this.user.displayName = this.user.firstName + ' ' + this.user.lastName;
        this.user.id = documentSnapshot.id;
        this.user.hobbies = this.user.hobbies.split(',');
        console.log(this.user);
      })
      /*
      .pipe(
        tap(user => this.seo.generateTags({
          title: user.displayName,
          description: user.bio,
          image: user.photoURL,
        }))
      )
      */
      .catch((error) => {
        console.log(error);
      });
     
  }

  getUsersPosts(id: string) {
    firebase
      .firestore()
      .collection('threads')
      .where('owner', '==', id)
      .get()
      .then((data) => {
        this.threads = data.docs;
      });
  }  

}
