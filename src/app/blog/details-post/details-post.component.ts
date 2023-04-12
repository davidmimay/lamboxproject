import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { Observable } from 'rxjs';
import { PostI } from '../blog.model';

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.scss']
})
export class DetailsPostComponent implements OnInit {
  public post$!: Observable<PostI>;
  
  constructor(private route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit() {
    const postId = this.route.snapshot.params['id'];
    // this.post$ = this.blogService.getOnePost(postId);

  }
}