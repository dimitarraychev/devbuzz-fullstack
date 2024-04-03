import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { specialCharactersValidator } from 'src/app/shared/validators/special-characters.validator';
import { profanityValidator } from 'src/app/shared/validators/profanity.validator';
import { FormValidationService } from 'src/app/core/services/form-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
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
  userAlreadyExists: boolean = false;
  lastEmailValue: string | undefined = undefined;
  private formSubscription: Subscription = new Subscription();

  registerForm = this.fb.nonNullable.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        specialCharactersValidator(),
        profanityValidator(),
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

  subscribeToFormChanges(): Subscription {
    return this.registerForm.valueChanges.subscribe((val) => {
      if (val.email !== this.lastEmailValue) {
        this.userAlreadyExists = false;
        this.lastEmailValue = val.email;
      }

      if (this.userAlreadyExists) return (this.isButtonDisabled = true);

      if (this.registerForm.valid && !this.userAlreadyExists) {
        this.errorMessage = null;
        return (this.isButtonDisabled = false);
      }

      if (
        this.isFieldInvalid('username') ||
        this.isFieldInvalid('email') ||
        this.isFieldInvalid('password') ||
        this.isFieldInvalid('rePassword')
      ) {
        this.errorMessage = this.formValidationService.validationErrorHandler(
          this.registerForm
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
      this.registerForm,
      this.isSubmitted
    );
  }

  onSubmit(): void {
    this.isSubmitted = true;

    const { username, email, password, rePassword } =
      this.registerForm.getRawValue();

    if (this.registerForm.invalid) {
      this.errorMessage = this.formValidationService.validationErrorHandler(
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
          if (this.errorMessage?.includes(' email address already exists!'))
            this.userAlreadyExists = true;

          this.isButtonDisabled = false;
        },
        complete: () => this.router.navigate(['/home']),
      });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
