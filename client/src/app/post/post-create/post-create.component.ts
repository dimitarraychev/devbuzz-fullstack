import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {}

  createForm = this.fb.nonNullable.group({
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

  isValid(element: string): boolean | undefined {
    return (
      this.createForm.get(element)?.invalid &&
      (this.createForm.get(element)?.dirty ||
        this.createForm.get(element)?.touched ||
        this.isSubmitted)
    );
  }

  onSubmit(): void {
    console.log(this.createForm.value, this.createForm.invalid);
    this.isSubmitted = true;

    if (this.createForm.invalid) {
      this.errorMessage = this.errorHandler();
      return;
    }

    this.postService.createPost$(this.createForm.getRawValue()).subscribe({
      next: (postId) => console.log(postId),
      error: (e) => console.log(e),
    });

    this.errorMessage = null;
  }

  errorHandler(): string {
    if (
      this.createForm.get('title')?.hasError('required') ||
      this.createForm.get('category')?.hasError('required') ||
      this.createForm.get('image')?.hasError('required') ||
      this.createForm.get('description')?.hasError('required')
    )
      return 'Uh-oh! All fields are required.';
    if (
      this.createForm.get('title')?.hasError('minlength') ||
      this.createForm.get('title')?.hasError('maxlength')
    )
      return 'Oops, title should be between 10 and 100 characters.';
    if (this.createForm.get('image')?.hasError('pattern'))
      return 'Sorry, image should start with http:// or https://.';
    if (
      this.createForm.get('description')?.hasError('minlength') ||
      this.createForm.get('description')?.hasError('maxlength')
    )
      return 'Oops, description should be between 50 and 3000 characters.';
    return 'A wild error occurred! Try again.';
  }
}
