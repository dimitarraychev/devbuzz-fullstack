import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostService } from '../../services/post.service';
import { specialCharactersValidator } from 'src/app/shared/validators/special-characters.validator';
import { profanityValidator } from 'src/app/shared/validators/profanity.validator';
import { StorageService } from 'src/app/core/services/storage.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private formValidationService: FormValidationService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formSubscription = this.subscribeToFormChanges();
  }

  errorMessage: string | null = null;
  isSubmitted: boolean = false;
  isButtonDisabled: boolean = true;
  uploadedFilePath: string = '';
  private formSubscription: Subscription = new Subscription();

  createForm = this.fb.nonNullable.group({
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
        specialCharactersValidator(),
        profanityValidator(),
      ],
    ],
    category: ['', [Validators.required]],
    image: ['', [Validators.required]],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(3000),
        profanityValidator(),
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
        this.errorMessage = this.formValidationService.validationErrorHandler(
          this.createForm
        );
        return (this.isButtonDisabled = true);
      }
      this.errorMessage = null;
      return (this.isButtonDisabled = true);
    });
  }

  isFieldInvalid(field: string): boolean | undefined {
    return this.formValidationService.isFieldInvalid(
      field,
      this.createForm,
      this.isSubmitted
    );
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];
    if (file) {
      this.storageService.uploadFile(file).subscribe({
        next: (path) => (this.uploadedFilePath = path),
        error: (e) => (this.errorMessage = e.error.message),
      });
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.createForm.invalid) {
      this.errorMessage = this.formValidationService.validationErrorHandler(
        this.createForm
      );
      return;
    }

    this.isButtonDisabled = true;

    const { title, category, description } = this.createForm.getRawValue();
    const image = this.uploadedFilePath;

    this.postService
      .createPost({ title, category, description, image })
      .subscribe({
        next: (post) => this.router.navigate(['/posts', post._id]),
        error: (e) => {
          this.errorMessage = e.error.message;
          this.isButtonDisabled = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
