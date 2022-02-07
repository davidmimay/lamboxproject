import {Injectable} from '@angular/core';
import {objectExists} from './utilities.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {filter, first, map, startWith, switchMap} from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class SubscribedService {

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {}

  readonly currentUser$ = this.afAuth.authState.pipe(filter(objectExists));

  readonly doesNotHaveSubs$: Observable<boolean> = this.currentUser$.pipe(
    
    filter(objectExists),
    switchMap((user) => {
      return new Promise<boolean>((resolve, reject) => {
        firebase
          .firestore()
          .collection('customers')
          .doc(user.uid)
          .collection('subscriptions')
          .where('status', 'in', ['trialing', 'active'])
          .onSnapshot(async (snapshot) => {
            // In this implementation we only expect one active or trialing subscription to exist.
            const doc = snapshot.docs[0];
            console.log(doc.id, ' => ', doc.data()); // console log subscription info if you want to do anything with it
            resolve(true);
          });
      });
    }),
    startWith(false)
  );
}