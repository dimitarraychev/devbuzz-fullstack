import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rePassword: ['', [Validators.required]],
  });

  errorMessage: string | null = null;
  isSubmitted: boolean = false;

  isValid(element: string): boolean | undefined {
    return (
      this.registerForm.get(element)?.invalid &&
      (this.registerForm.get(element)?.dirty ||
        this.registerForm.get(element)?.touched ||
        this.isSubmitted)
    );
  }

  onSubmit(): void {
    this.isSubmitted = true;

    const { username, email, password, rePassword } =
      this.registerForm.getRawValue();

    if (this.registerForm.invalid) {
      this.errorMessage = this.validationErrorHandler();
      return;
    }

    if (password !== rePassword) {
      this.errorMessage = 'Oops! Passwords should match.';
      return;
    }

    if (username != undefined && email != undefined && password != undefined) {
      this.userService
        .register({
          username,
          email,
          password,
        })
        .subscribe({
          next: (res) => {
            this.cookieService.set('auth', res.token, 7);
            localStorage.setItem(
              'user',
              JSON.stringify({ username: res.username, _id: res._id })
            );
            this.router.navigate(['/home']);
            this.errorMessage = null;
          },
          error: (e) => (this.errorMessage = e.error.message),
          complete: () => console.info('complete'),
        });
    }
  }

  validationErrorHandler(): string {
    if (
      this.registerForm.get('username')?.hasError('required') ||
      this.registerForm.get('email')?.hasError('required') ||
      this.registerForm.get('password')?.hasError('required') ||
      this.registerForm.get('rePassword')?.hasError('required')
    )
      return 'Uh-oh! All fields are required.';
    return 'A wild error occurred! Try again.';
  }
}
