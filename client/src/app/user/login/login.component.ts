import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  errorMessage: string | null = null;
  isSubmitted: boolean = false;
  isButtonDisabled: boolean = false;

  isValid(element: string): boolean | undefined {
    return (
      this.loginForm.get(element)?.invalid &&
      (this.loginForm.get(element)?.dirty ||
        this.loginForm.get(element)?.touched ||
        this.isSubmitted)
    );
  }

  onSubmit(): void {
    this.isSubmitted = true;

    const { email, password } = this.loginForm.getRawValue();

    if (this.loginForm.invalid) {
      this.errorMessage = this.validationErrorHandler();
      return;
    }

    this.isButtonDisabled = true;

    this.userService
      .login$({
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

  validationErrorHandler(): string {
    if (
      this.loginForm.get('email')?.hasError('required') ||
      this.loginForm.get('password')?.hasError('required')
    )
      return 'Uh-oh! All fields are required.';
    return 'A wild error occurred! Try again.';
  }
}
