import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../blog.service';
// import { PostI } from '../blog.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Firestore, getDocs, collection } from '@angular/fire/firestore';

export interface Post {
  titlePost: string;
  contentPost: string;
  imagePost?: any;
  id?: string;
  tagsPost: string;
  fileRef?: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public posts$: Observable<Post[]> | undefined;
  // posts$!: Post;

  // @Input() post!: PostI;
  posts: any = [];

  constructor(
    private blogService: BlogService,
    private firestore: Firestore
  ) {
    this.getPosts();
  }

  // async getPosts1() {
  //   const querySnapshot = await getDocs(collection(this.firestore, 'posts'));
  //   const posts: Post[] = [];
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //     const data = doc.data();
  //     posts.push({
  //       titlePost: data['titlePost'],
  //     });
  //   });
  //   return posts;
  // }

  // async getPosts2() {
  //   const querySnapshot = await getDocs(collection(this.firestore, 'posts'));
  //   const posts: Post[] = [];
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //     const data = doc.data() as Post;
  //     const id = doc.id;
  //     // // posts.push({
  //     // //   titlePost: data['titlePost'],
  //     // // });
  //     return { id, ...data };
  //   });
  //   return posts;
  // }

  async getPosts() {
    const querySnapshot = await getDocs(collection(this.firestore, 'posts'));
    const posts: Post[] = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const data: any = doc.data();

      // const data = doc.data() as Post;
      const id = doc.id;
      posts.push({ id, ...data });

      // posts.push({
        // id,
        // title: data.title,

        // titlePost: data['titlePost'],
      // });
    });
    this.posts = posts;
  }

  // WORKING
  // async getPosts4() {
  //   const querySnapshot = await getDocs(collection(this.firestore, 'posts'));
  //   const posts: Post[] = [];
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //     const data: any = doc.data();

  //     // const data = doc.data() as Post;
  //     const id = doc.id;
  //     // posts.push({ id, ...data });

  //     posts.push({
  //       // id,
  //       title: data.title,

  //       // titlePost: data['titlePost'],
  //     });
  //   });
  //   this.posts = posts;
  //   //return posts;
  // }

  // public async getAllPosts() {
  //   const querySnapshot = await getDocs(collection(this.firestore, 'posts'));
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //     const data = doc.data() as Post;
  //     const id = doc.id;
  //     return { id, ...data };
  //   });
  // }



  // async loadBooks(){
  //   const querySnapshot = await getDocs(collection(this.firestore, "books"));
  //   const books: Post[] = [];
  //   querySnapshot.forEach((doc) => {
  //     const data = doc.data();
  //     books.push({
  //       author: data['author'],
  //       title: data['title'],
  //       description: data['description']
  //     });
  //   });
  //   return books;
  // }

 

  ngOnInit() {
    // this.blogService.getAllPosts();
    // this.posts$! = this.blogService.getAllPosts();
    // this.getPosts3();
  }
}