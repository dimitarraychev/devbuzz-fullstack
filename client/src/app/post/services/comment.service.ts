import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/types/api.type';
import { NewComment } from 'src/app/types/post.type';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addComment(commentData: NewComment): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + '/comments', commentData);
  }

  deleteComent(commentId: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(
      this.apiUrl + '/comments/' + commentId
    );
  }
}
