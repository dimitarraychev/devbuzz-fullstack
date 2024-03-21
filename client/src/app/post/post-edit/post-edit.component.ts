import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/types/post.type';
import { PostErrorService } from '../services/post-error.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private postErrorService: PostErrorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  editForm = this.fb.nonNullable.group({
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
      ],
    ],
    category: ['', [Validators.required]],
    image: ['', [Validators.required, Validators.pattern(/^https?:\/\//)]],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(3000),
      ],
    ],
  });

  errorMessage: string | null = null;
  isSubmitted: boolean = false;
  post = {} as Post;
  postId: string = '';
  isLoading: boolean = true;
  isButtonDisabled: boolean = false;

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    this.postId = this.activatedRoute.snapshot.params['id'];

    this.postService.getPost$(this.postId).subscribe({
      next: (post) => {
        this.post = post;
        this.setFormValues();
        this.isLoading = false;
      },
      error: (e) => console.log(e), // TODO redirect to 404,
    });
  }

  setFormValues(): void {
    this.editForm.patchValue({
      title: this.post.title,
      category: this.post.category,
      image: this.post.image,
      description: this.post.description,
    });
  }

  isValid(element: string): boolean | undefined {
    return (
      this.editForm.get(element)?.invalid &&
      (this.editForm.get(element)?.dirty ||
        this.editForm.get(element)?.touched ||
        this.isSubmitted)
    );
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.editForm.invalid) {
      this.errorMessage = this.postErrorService.formErrorHandler(this.editForm);
      return;
    }

    this.isButtonDisabled = true;

    this.postService
      .editPost$(this.postId, this.editForm.getRawValue())
      .subscribe({
        next: (res) => this.router.navigate(['/posts', res._id]),
        error: (e) => {
          this.errorMessage = e.error.message;
          this.isButtonDisabled = false;
        },
      });
  }
}
