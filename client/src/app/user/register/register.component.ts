import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
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
    private router: Router
  ) {}

  registerForm = this.fb.nonNullable.group({
    username: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(9),
        Validators.maxLength(30),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rePassword: ['', [Validators.required]],
  });

  errorMessage: string | null = null;
  isSubmitted: boolean = false;
  isButtonDisabled: boolean = false;

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

    this.isButtonDisabled = true;

    this.userService
      .register$({
        username,
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
      this.registerForm.get('username')?.hasError('required') ||
      this.registerForm.get('email')?.hasError('required') ||
      this.registerForm.get('password')?.hasError('required') ||
      this.registerForm.get('rePassword')?.hasError('required')
    )
      return 'Uh-oh! All fields are required.';
    if (
      this.registerForm.get('username')?.hasError('minlength') ||
      this.registerForm.get('username')?.hasError('maxlength')
    )
      return 'Sorry, username should be between 3 and 20 characters.';
    if (
      this.registerForm.get('email')?.hasError('minlength') ||
      this.registerForm.get('email')?.hasError('maxlength')
    )
      return 'Sorry, email should be between 9 and 30 characters.';
    if (this.registerForm.get('email')?.hasError('email'))
      return 'Oops, a valid email email address is required';
    if (this.registerForm.get('password')?.hasError('minlength'))
      return 'Sorry, password should be at least 6 characters.';
    return 'A wild error occurred! Try again.';
  }
}
