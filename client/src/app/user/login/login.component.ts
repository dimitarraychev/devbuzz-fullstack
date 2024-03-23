import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserErrorService } from '../services/user-error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userErrorService: UserErrorService,
    private router: Router
  ) {
    this.formSubscription = this.loginForm.valueChanges.subscribe(() => {
      if (this.loginForm.valid) {
        this.errorMessage = null;
        return (this.isButtonDisabled = false);
      }
      if (this.isFieldInvalid('email') || this.isFieldInvalid('password')) {
        this.errorMessage = this.userErrorService.validationErrorHandler(
          this.loginForm
        );
        return (this.isButtonDisabled = true);
      }
      this.errorMessage = null;
      return (this.isButtonDisabled = true);
    });
  }

  errorMessage: string | null = null;
  isSubmitted: boolean = false;
  isButtonDisabled: boolean = true;
  private formSubscription: Subscription;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  isFieldInvalid(field: string): boolean | undefined {
    return this.userErrorService.isFieldInvalid(
      field,
      this.loginForm,
      this.isSubmitted
    );
  }

  onSubmit(): void {
    this.isSubmitted = true;

    const { email, password } = this.loginForm.getRawValue();

    if (this.loginForm.invalid) {
      this.errorMessage = this.userErrorService.validationErrorHandler(
        this.loginForm
      );
      return;
    }

    this.isButtonDisabled = true;

    this.userService
      .login({
        email,
        password,
      })
      .subscribe({
        next: (res) => this.userService.setCookie(res),
        error: (e) => {
          this.errorMessage = e.error.message;
          this.isButtonDisabled = false;
        },
        complete: () => this.router.navigate(['/home']),
      });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
