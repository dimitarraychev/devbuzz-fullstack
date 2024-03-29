import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { profanity } from '@2toad/profanity';

const regex = new RegExp(/[!@#$%^&*(),.?":{}|<>]/);

export function profanityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const profane = profanity.exists(control.value);
    return profane ? { profane: { value: true } } : null;
  };
}
