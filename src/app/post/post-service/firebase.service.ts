import { Injectable, inject } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);
  postsCollection = collection(this.firestore, 'posts');

  constructor() {}
}
