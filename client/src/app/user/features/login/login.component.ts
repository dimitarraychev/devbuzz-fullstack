import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { FormValidationService } from 'src/app/core/services/form-validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private formValidationService: FormValidationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formSubscription = this.subscribeToFormChanges();
  }

  errorMessage: string | null = null;
  isSubmitted: boolean = false;
  isButtonDisabled: boolean = true;
  invalidUsernameOrPassword: boolean = false;
  private formSubscription: Subscription = new Subscription();

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  subscribeToFormChanges(): Subscription {
    return this.loginForm.valueChanges.subscribe(() => {
      this.invalidUsernameOrPassword = false;

      if (this.loginForm.valid) {
        this.errorMessage = null;
        return (this.isButtonDisabled = false);
      }

      if (this.isFieldInvalid('email') || this.isFieldInvalid('password')) {
        this.errorMessage = this.formValidationService.validationErrorHandler(
          this.loginForm
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
      this.loginForm,
      this.isSubmitted
    );
  }

  onSubmit(): void {
    this.isSubmitted = true;

    const { email, password } = this.loginForm.getRawValue();

    if (this.loginForm.invalid) {
      this.errorMessage = this.formValidationService.validationErrorHandler(
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
          this.invalidUsernameOrPassword = true;
          this.isButtonDisabled = false;
        },
        complete: () => this.router.navigate(['/home']),
      });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
