
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BlogRoutingModule } from './blog-routing.module';
import { DetailsPostComponent } from './details-post/details-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { DialogComponent } from './dialog/dialog.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostComponent } from './post/post.component';
import { TableComponent } from './table/table.component';
import { CommentComponent } from './comment/comment.component';
import { CommentDialogComponent } from './comment/comment-dialog.component';
import { PageComponent } from './page/page.component';

 
@NgModule({
  declarations: [
    DetailsPostComponent,
    EditPostComponent,
    DialogComponent,
    NewPostComponent,
    PostComponent,
    TableComponent,
    CommentComponent,
    CommentDialogComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PostComponent
  ]
})
export class BlogModule { }
