import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { PostI, FileI } from './blog.model';
import { databaseInstance$ } from '@angular/fire/database';
// import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private postsCollection: any; // private postsCollection: collection<PostI>;
  private filePath: any;
  // private downloadURL: Observable<string>;

  constructor(
    private firestore: Firestore,
    // private storage: AngularFireStorage,
  ) {
    // this.postsCollection = firestore.collection<PostI>('posts');
  }

  public getAllPosts1(): Observable<PostI[]> {
    return this.postsCollection
      .snapshotChanges()
      // .pipe(
      //   map(actions =>
      //     actions.map(a => {
      //       const data = a.payload.doc.data() as PostI;
      //       const id = a.payload.doc.id;
      //       return { id, ...data };
      //     })
      //   )
      // );
  }

  // public getOnePost(id: PostI): Observable<PostI> {
  //   return this.firestore.doc<PostI>(`posts/${id}`).valueChanges();
  // }

 

  public async getAllPosts2(): Promise<PostI[]> {
    return (await getDocs(collection(this.firestore, 'posts'))).docs.map((doc) => doc.data()) as PostI[];
  }

  public async getAllPosts3() {
    const querySnapshot = await getDocs(collection(this.firestore, 'posts'));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const data = doc.data() as PostI;
      const id = doc.id as PostI['id'];
      return { id, ...data };
    });
  }


  

  public deletePostById(post: PostI) {
    return this.postsCollection.doc(post.id).delete();
  }

  public editPostById(post: PostI, newImage?: FileI) {
    if (newImage) {
      this.uploadImage(post, newImage);
    } else {
      return this.postsCollection.doc(post.id).update(post);
    }
  }

  public preAddAndUpdatePost(post: PostI, image: FileI): void {
    this.uploadImage(post, image);
  }

  private savePost(post: PostI) {
    const postObj = {
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      // imagePost: this.downloadURL,
      fileRef: this.filePath,
      tagsPost: post.tagsPost
    };

    if (post.id) {
      return this.postsCollection.doc(post.id).update(postObj);
    } else {
      return this.postsCollection.add(postObj);
    }

  }

  private uploadImage(post: PostI, image: FileI) {
    // this.filePath = `posts/${image.name}`;
    // const fileRef = this.storage.ref(this.filePath);
    // const task = this.storage.upload(this.filePath, image);
    // task.snapshotChanges()
    //   .pipe(
    //     finalize(() => {
    //       fileRef.getDownloadURL().subscribe(urlImage => {
    //         this.downloadURL = urlImage;
    //         this.savePost(post);
    //       });
    //     })
    //   ).subscribe();
  }
}
