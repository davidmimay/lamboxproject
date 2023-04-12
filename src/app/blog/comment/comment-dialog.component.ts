import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-comment-dialog',
  template: `
    <div mat-dialog-content>
      <h1>Your comment about this post</h1>   
      <mat-form-field>
        <mat-label>comment...</mat-label>
        <input matInput [(ngModel)]="data.ask" />
        <mat-icon matSuffix [mat-dialog-close]="data.ask" cdkFocusInitial>send</mat-icon>
        <mat-hint>your comment is public</mat-hint>
      </mat-form-field>
    </div>
  `
})

export class CommentDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: Auth,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

}