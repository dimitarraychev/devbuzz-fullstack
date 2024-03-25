import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UserErrorService } from '../../services/user-error.service';
import { Subscription } from 'rxjs';
import { specialCharactersValidator } from 'src/app/shared/validators/special-characters.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userErrorService: UserErrorService,
    private router: Router
  ) {
    this.formSubscription = this.registerForm.valueChanges.subscribe((val) => {
      if (this.registerForm.valid) {
        this.errorMessage = null;
        return (this.isButtonDisabled = false);
      }
      if (
        this.isFieldInvalid('username') ||
        this.isFieldInvalid('email') ||
        this.isFieldInvalid('password') ||
        this.isFieldInvalid('rePassword')
      ) {
        this.errorMessage = this.userErrorService.validationErrorHandler(
          this.registerForm
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

  registerForm = this.fb.nonNullable.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        specialCharactersValidator(),
      ],
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

  isFieldInvalid(field: string): boolean | undefined {
    return this.userErrorService.isFieldInvalid(
      field,
      this.registerForm,
      this.isSubmitted
    );
  }

  onSubmit(): void {
    this.isSubmitted = true;

    const { username, email, password, rePassword } =
      this.registerForm.getRawValue();

    if (this.registerForm.invalid) {
      this.errorMessage = this.userErrorService.validationErrorHandler(
        this.registerForm
      );
      return;
    }

    if (password !== rePassword) {
      this.errorMessage = 'Oops! Passwords should match.';
      return;
    }

    this.isButtonDisabled = true;

    this.userService
      .register({
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

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
