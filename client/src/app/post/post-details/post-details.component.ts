import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from 'src/app/types/post.type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  post = {} as Post;
  postId: string = '';
  isLoading: boolean = true;

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    this.postId = this.activatedRoute.snapshot.params['id'];

    this.postService.getPost(this.postId).subscribe({
      next: (post) => {
        this.post = post;
        this.isLoading = false;
      },
      error: (e) => console.log(e), // TODO redirect to 404,
    });
  }
}