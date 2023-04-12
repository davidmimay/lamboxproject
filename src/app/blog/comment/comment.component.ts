import { Component, OnInit, } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from './comment-dialog.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Comment {
  id?: string;
  postId?: string;
  userId?: string;
  ask?: string;
  // date?: any;
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  // comments: Comment[]; // from board.model
  // sub: Subscription; // from rxjs
  // postId: string; //

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public auth: Auth,
    private firestore: Firestore,
  ) {}

  // drop boards
  /*
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.comments, event.previousIndex, event.currentIndex);
    this.postService.sortComments(this.comments);
  }
  */
  // dialog new board
  openCommentDialog(): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '400px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   this.createComment({
      //     ask: result,
      //     postId: this.postId = this.route.snapshot.paramMap.get('id'),
      //     // priority: this.comments.length
      //   });
      // }
    });
  }

  async createComment(data: Comment) {
    // const timestamp = firebase.firestore.FieldValue.serverTimestamp;
    // const user = await this.auth.currentUser;
    // const expires = 2 * 60 * 60;
    // return this.firestore.collection('comments').add({
    //   ...data,
    //   userId: user.uid,
    //   createdAt: timestamp(),
    //   // tasks: [{ description: 'Hello!', label: 'yellow' }]
    // });
  }
 
  // commentsCollection: AngularFirestoreCollection<Comment>;
  // commentsObservable: Observable<Comment[]>;
 
  ngOnInit() {
    // this.postId = this.route.snapshot.paramMap.get('id');
    // // Step 1: Make a reference
    // this.commentsCollection = this.firestore.collection('comments', ref => ref.where('postId', '==', this.postId))
    // // .orderBy('createdAt')) // not working yet

    // // Step 2: Get an observable of the data
    // this.commentsObservable = this.commentsCollection.valueChanges({ idField: 'id' }); // idfield to get commentId
  }


}