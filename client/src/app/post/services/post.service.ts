import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { NewPost, Post, PostCard } from '../../types/post.type';
import { ApiPostResponse } from '../../types/api.type';

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

  getHottestPosts(category: string): Observable<PostCard[]> {
    return this.http.get<PostCard[]>(this.apiUrl + '/posts/hottest', {
      params: { category },
    });
  }

  getPost(postId: string): Observable<Post> {
    return this.http.get<Post>(this.apiUrl + '/posts/' + postId);
  }

  createPost(postData: NewPost): Observable<Post> {
    return this.http.post<Post>(this.apiUrl + '/posts', postData);
  }

  editPost(postId: string, postData: NewPost): Observable<Post> {
    return this.http.patch<Post>(this.apiUrl + '/posts/' + postId, postData);
  }

  deletePost(postId: string): Observable<Post> {
    return this.http.delete<Post>(this.apiUrl + '/posts/' + postId);
  }

  likePost(postId: string): Observable<Post> {
    return this.http.post<Post>(this.apiUrl + '/posts/' + postId + '/like', {});
  }

  unlikePost(postId: string): Observable<Post> {
    return this.http.post<Post>(
      this.apiUrl + '/posts/' + postId + '/unlike',
      {}
    );
  }
}
