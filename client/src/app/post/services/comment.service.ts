import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { NewComment, Post } from 'src/app/types/post.type';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addComment(commentData: NewComment): Observable<Post> {
    return this.http.post<Post>(this.apiUrl + '/comments', commentData);
  }

  deleteComent(commentId: string): Observable<Post> {
    return this.http.delete<Post>(this.apiUrl + '/comments/' + commentId);
  }
}
