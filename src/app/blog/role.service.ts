import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { Observable , of } from 'rxjs';

export interface Roles { 
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles: Roles;
}

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  user$!: Observable<User>;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {

    // this.user = authState(auth).pipe(
    //   switchMap(user => {
    //     if (user) {
    //       const docRef = doc(this.firestore, "users", user.uid);
    //       const docSnap = await getDoc(docRef);

    //       return this.firestore.doc<User>(`users/${user.uid}`).valueChanges()
    //     } else {
    //       return of(null)
    //     }
    //   })
    // );
  }
  
  public updateUserData() { //   public updateUserData(user) {

    // Sets user data to firestore on login
    // const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.uid}`);

    // const data: User = {
    //   uid: user.uid,
    //   email: user.email,
    //   roles: {
    //     subscriber: true
    //   }
    // }
    // return userRef.set(data, { merge: true })
  }

  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber']
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor']
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      // if ( user.roles[role] ) {
      //   return true
      // }
    }
    return false
  }

}