import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostService } from '../../services/post.service';
import { PostErrorService } from '../../services/post-error.service';
import { specialCharactersValidator } from 'src/app/shared/validators/special-characters.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private postErrorService: PostErrorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formSubscription = this.subscribeToFormChanges();
  }

  errorMessage: string | null = null;
  isSubmitted: boolean = false;
  isButtonDisabled: boolean = true;
  private formSubscription: Subscription = new Subscription();

  createForm = this.fb.nonNullable.group({
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
        specialCharactersValidator(),
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

  subscribeToFormChanges(): Subscription {
    return this.createForm.valueChanges.subscribe((val) => {
      if (this.createForm.valid) {
        this.errorMessage = null;
        return (this.isButtonDisabled = false);
      }
      if (
        this.isFieldInvalid('title') ||
        this.isFieldInvalid('category') ||
        this.isFieldInvalid('image') ||
        this.isFieldInvalid('description')
      ) {
        this.errorMessage = this.postErrorService.validationErrorHandler(
          this.createForm
        );
        return (this.isButtonDisabled = true);
      }
      this.errorMessage = null;
      return (this.isButtonDisabled = false);
    });
  }

  isFieldInvalid(field: string): boolean | undefined {
    return this.postErrorService.isFieldInvalid(
      field,
      this.createForm,
      this.isSubmitted
    );
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.createForm.invalid) {
      this.errorMessage = this.postErrorService.validationErrorHandler(
        this.createForm
      );
      return;
    }

    this.isButtonDisabled = true;

    this.postService.createPost(this.createForm.getRawValue()).subscribe({
      next: (res) => this.router.navigate(['/posts', res._id]),
      error: (e) => {
        this.errorMessage = e.error.message;
        this.isButtonDisabled = false;
      },
    });
  }

  onClose(): void {
    this.router.navigate(['posts/feed']);
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
