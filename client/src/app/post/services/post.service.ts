import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { NewPost, Post } from '../../types/post.type';
import { ApiResponse, ApiPostResponse } from '../../types/api.type';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLatestPosts(
    page: number,
    limit: number,
    category: string,
    search: string
  ): Observable<ApiPostResponse> {
    return this.http.get<ApiPostResponse>(this.apiUrl + '/posts', {
      params: {
        page: page.toString(),
        limit: limit.toString(),
        category,
        search,
      },
    });
  }

  getHottestPosts(category: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl + '/posts/hottest', {
      params: { category },
    });
  }

  getPost(postId: string): Observable<Post> {
    return this.http.get<Post>(this.apiUrl + '/posts/' + postId);
  }

  createPost(postData: NewPost): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + '/posts', postData);
  }

  editPost(postId: string, postData: NewPost): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(
      this.apiUrl + '/posts/' + postId,
      postData
    );
  }

  deletePost(postId: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.apiUrl + '/posts/' + postId);
  }

  likePost(postId: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.apiUrl + '/posts/' + postId + '/like',
      {}
    );
  }
}
