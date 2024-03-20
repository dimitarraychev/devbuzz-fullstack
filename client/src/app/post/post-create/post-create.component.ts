import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { PostErrorService } from '../services/post-error.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private postErrorService: PostErrorService,
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
  isButtonDisabled: boolean = false;

  isValid(element: string): boolean | undefined {
    return (
      this.createForm.get(element)?.invalid &&
      (this.createForm.get(element)?.dirty ||
        this.createForm.get(element)?.touched ||
        this.isSubmitted)
    );
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.createForm.invalid) {
      this.errorMessage = this.postErrorService.formErrorHandler(
        this.createForm
      );
      return;
    }

    this.isButtonDisabled = true;

    this.postService.createPost$(this.createForm.getRawValue()).subscribe({
      next: (res) => this.router.navigate(['/post', res._id]),
      error: (e) => {
        this.errorMessage = e.error.message;
        this.isButtonDisabled = false;
      },
    });
  }
}
