import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PostType } from 'src/app/types/post.type';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  firestore: Firestore = inject(Firestore);
  postsCollectionRef = collection(this.firestore, 'posts');

  getPosts(): Observable<PostType[]> {
    return collectionData(this.postsCollectionRef, {
      idField: 'id',
    }) as Observable<PostType[]>;
  }
}
