import { Injectable } from '@angular/core';
import {
  Storage,
  UploadTaskSnapshot,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  uploadFile(file: File): Observable<string> {
    return new Observable<string>((observer) => {
      if (!file) {
        observer.error('File is null or undefined');
        return;
      }

      const filePath = 'posts/' + Date.now() + '_' + file.name;
      const storageRef = ref(this.storage, filePath);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask
        .then((snapshot: UploadTaskSnapshot) => {
          getDownloadURL(storageRef)
            .then((downloadURL) => {
              observer.next(downloadURL);
              observer.complete();
            })
            .catch((error) => {
              observer.error(error);
            });
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
