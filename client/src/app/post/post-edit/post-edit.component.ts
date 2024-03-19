import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/types/post.type';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
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
    // console.log(this.editForm.value, this.editForm.invalid);
    this.isSubmitted = true;

    if (this.editForm.invalid) {
      this.errorMessage = this.errorHandler();
      return;
    }

    this.postService
      .editPost$(this.postId, this.editForm.getRawValue())
      .subscribe({
        next: (postId) => console.log(postId),
        error: (e) => console.log(e),
      });

    this.errorMessage = null;
  }

  errorHandler(): string {
    if (
      this.editForm.get('title')?.hasError('required') ||
      this.editForm.get('category')?.hasError('required') ||
      this.editForm.get('image')?.hasError('required') ||
      this.editForm.get('description')?.hasError('required')
    )
      return 'Uh-oh! All fields are required.';
    if (
      this.editForm.get('title')?.hasError('minlength') ||
      this.editForm.get('title')?.hasError('maxlength')
    )
      return 'Oops, title should be between 10 and 100 characters.';
    if (this.editForm.get('image')?.hasError('pattern'))
      return 'Sorry, image should start with http:// or https://.';
    if (
      this.editForm.get('description')?.hasError('minlength') ||
      this.editForm.get('description')?.hasError('maxlength')
    )
      return 'Oops, description should be between 50 and 3000 characters.';
    return 'A wild error occurred! Try again.';
  }
}
