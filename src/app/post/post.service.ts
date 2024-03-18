import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewPost, Post } from '../types/post.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLatestPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl + '/posts');
  }

  getHottestPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl + '/posts/hottest');
  }

  getPost(postId: string): Observable<Post> {
    return this.http.get<Post>(this.apiUrl + '/posts/' + postId);
  }

  createPost(postData: NewPost): Observable<string> {
    return this.http.post<string>(this.apiUrl + '/posts', postData);
  }
}
