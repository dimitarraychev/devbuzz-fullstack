import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PostErrorService {
  private postFormFields: string[] = [
    'title',
    'category',
    'image',
    'description',
  ];

  isFieldInvalid(
    field: string,
    form: FormGroup,
    isSubmitted: boolean
  ): boolean | undefined {
    return (
      form.get(field)?.invalid &&
      (form.get(field)?.dirty || form.get(field)?.touched || isSubmitted)
    );
  }

  validationErrorHandler(form: FormGroup): string {
    for (const field of this.postFormFields) {
      if (form.get(field)?.hasError('required'))
        return `Uh-oh! ${field} is required.`;
      if (form.get(field)?.hasError('minlength'))
        return `Sorry, ${field} should be at least ${
          form.get(field)?.errors?.['minlength'].requiredLength
        } characters.`;
      if (form.get(field)?.hasError('maxlength'))
        return `Sorry, ${field} should be no more than ${
          form.get(field)?.errors?.['maxlength'].requiredLength
        } characters.`;
      if (form.get(field)?.hasError('specialCharacters'))
        return `Oops! ${field} cannot contain any special characters.`;
      if (form.get(field)?.hasError('profane'))
        return `Sorry, ${field} cannot contain profanity.`;
      if (form.get(field)?.hasError('pattern'))
        return 'Sorry, image should start with "http://" or "https://".';
    }
    return 'A wild error occurred! Try again.';
  }
}
