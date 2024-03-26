import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Post } from 'src/app/types/post.type';
import { PostService } from '../../services/post.service';
import { PostErrorService } from '../../services/post-error.service';
import { UserService } from 'src/app/user/services/user.service';
import { specialCharactersValidator } from 'src/app/shared/validators/special-characters.validator';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private postErrorService: PostErrorService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPost();
    this.formSubscription = this.subscribeToFormChanges();
  }

  errorMessage: string | null = null;
  isSubmitted: boolean = false;
  post = {} as Post;
  postId: string = this.activatedRoute.snapshot.params['id'];
  isLoading: boolean = true;
  isButtonDisabled: boolean = false;
  private formSubscription: Subscription = new Subscription();

  editForm = this.fb.nonNullable.group({
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
    return this.editForm.valueChanges.subscribe((val) => {
      if (this.editForm.valid) {
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
          this.editForm
        );
        return (this.isButtonDisabled = true);
      }
      this.errorMessage = null;
      return (this.isButtonDisabled = true);
    });
  }

  getPost(): void {
    this.postService.getPost(this.postId).subscribe({
      next: (post) => {
        if (post.owner._id != this.userService.user?._id) {
          this.router.navigate(['/home']);
          return;
        }
        this.post = post;
        this.setFormValues();
        this.isLoading = false;
      },
      error: (e) => this.router.navigate(['/404']),
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

  isFieldInvalid(field: string): boolean | undefined {
    return this.postErrorService.isFieldInvalid(
      field,
      this.editForm,
      this.isSubmitted
    );
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.editForm.invalid) {
      this.errorMessage = this.postErrorService.validationErrorHandler(
        this.editForm
      );
      return;
    }

    this.isButtonDisabled = true;

    this.postService
      .editPost(this.postId, this.editForm.getRawValue())
      .subscribe({
        next: (res) => this.router.navigate(['/posts', res._id]),
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
