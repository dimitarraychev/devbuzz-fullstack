import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/types/api.type';
import { NewComment } from 'src/app/types/post.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addComment$(commentData: NewComment): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + '/comments', commentData);
  }

  // editPost$(postId: string, postData: NewPost): Observable<ApiResponse> {
  //   return this.http.patch<ApiResponse>(
  //     this.apiUrl + '/posts/' + postId,
  //     postData
  //   );
  // }

  // deletePost$(postId: string): Observable<ApiResponse> {
  //   return this.http.delete<ApiResponse>(this.apiUrl + '/posts/' + postId);
  // }
}
