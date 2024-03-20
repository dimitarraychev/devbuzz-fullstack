import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PostErrorService {
  constructor() {}

  formErrorHandler(form: FormGroup): string {
    if (
      form.get('title')?.hasError('required') ||
      form.get('category')?.hasError('required') ||
      form.get('image')?.hasError('required') ||
      form.get('description')?.hasError('required')
    )
      return 'Uh-oh! All fields are required.';
    if (
      form.get('title')?.hasError('minlength') ||
      form.get('title')?.hasError('maxlength')
    )
      return 'Oops, title should be between 10 and 100 characters.';
    if (form.get('image')?.hasError('pattern'))
      return 'Sorry, image should start with http:// or https://';
    if (
      form.get('description')?.hasError('minlength') ||
      form.get('description')?.hasError('maxlength')
    )
      return 'Oops, description should be between 50 and 3000 characters.';
    return 'A wild error occurred! Try again.';
  }
}
