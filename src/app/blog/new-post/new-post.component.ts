import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostI } from '../blog.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  private image: any;
  constructor(private blogService: BlogService) { }

  public newPostForm = new FormGroup({
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
  });

  ngOnInit() {
  }

  addNewPost(data: PostI) {
    console.log('New post', data);
    this.blogService.preAddAndUpdatePost(data, this.image);
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }
}
